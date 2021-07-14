import express from 'express';
import ws from 'ws';
import cors from 'cors';
import { schema } from './graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import {
	shouldRenderGraphiQL,
	renderGraphiQL,
	getGraphQLParameters,
	processRequest,
} from 'graphql-helix';
import { PubSub } from 'graphql-subscriptions';
import { Context, createGraphQLContext } from './graphql/builder';

async function startServer() {
	const app = express();
	app.use(express.json());
	// @ts-ignore
	app.use(cors({ origin: 'http://localhost:3000', credentials: false }));

	app.use('/graphql', async (req, res) => {
		const request = {
			body: req.body,
			headers: req.headers,
			method: req.method,
			query: req.query,
		};

		try {
			if (shouldRenderGraphiQL(request)) {
				res.send(
					renderGraphiQL({
						subscriptionsEndpoint: '/graphql',
					}),
				);
			} else {
				const { operationName, query, variables } =
					getGraphQLParameters(request);

				const pubsub = new PubSub();

				const result = await processRequest<Context>({
					operationName,
					query,
					variables,
					request,
					schema,
					contextFactory: () => createGraphQLContext(req, res, pubsub),
				});

				// 1) RESPONSE: a regular JSON payload
				// 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
				// 3) PUSH: a stream of events to push back down the client for a subscription
				if (result.type === 'RESPONSE') {
					result.headers.forEach(({ name, value }) =>
						res.setHeader(name, value),
					);
					res.status(result.status);
					res.json(result.payload);
				} else if (result.type === 'MULTIPART_RESPONSE') {
					res.writeHead(200, {
						Connection: 'keep-alive',
						'Content-Type': 'multipart/mixed; boundary="-"',
						'Transfer-Encoding': 'chunked',
					});

					req.on('close', () => {
						result.unsubscribe();
					});

					res.write('---');

					await result.subscribe((result) => {
						const chunk = Buffer.from(JSON.stringify(result), 'utf-8');
						const data = [
							'',
							'Content-Type: application/json; charset=utf-8',
							'Content-Length: ' + String(chunk.length),
							'',
							chunk,
						];

						if (result.hasNext) {
							data.push('---');
						}

						res.write(data.join('\r\n'));
					});

					res.write('\r\n-----\r\n');
					res.end();
				} else {
					res.writeHead(200, {
						'Content-Type': 'text/event-stream',
						Connection: 'keep-alive',
						'Cache-Control': 'no-cache',
					});

					req.on('close', () => {
						result.unsubscribe();
					});

					await result.subscribe((result) => {
						res.write(`data: ${JSON.stringify(result)}\n\n`);
					});
				}
			}
		} catch (error) {
			res.status(500);
			res.end(error.toString());
		}
	});

	const server = app
		.listen(4000, () => {
			const wsServer = new ws.Server({
				server,
				path: '/graphql',
			});

			useServer(
				{
					schema,
					onSubscribe: (_ctx, message) => {
						// Access to the request header cookies, where the session cookie is also stored
						// => `_ctx.extra.request.headers.cookie`
						console.log(message);
					},
				},
				wsServer,
			);

			console.info(`
  #####################################
  🛡️  Server listening on port: 4000 🛡️
  #####################################
`);
		})
		.on('error', (err) => {
			console.error(err);
			process.exit(1);
		});
}
startServer();
