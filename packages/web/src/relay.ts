import {
	Environment,
	Network,
	Store,
	RecordSource,
	RequestParameters,
	Variables,
	Observable,
} from 'relay-runtime';
import { createClient } from 'graphql-ws';
import { GraphQLError } from 'graphql';

export function createRelayEnvironment() {
	function subscribe(operation: RequestParameters, variables: Variables) {
		try {
			const subscriptionClient = createClient({
				url: 'ws://localhost:4000/graphql',
			});
			return Observable.create((sink) => {
				if (!operation.text) {
					return sink.error(new Error('Operation text cannot be empty'));
				}
				return subscriptionClient.subscribe(
					{
						operationName: operation.name,
						query: operation.text,
						variables,
					},
					{
						...sink,
						error: (err) => {
							if (err instanceof Error) {
								return sink.error(err);
							}

							if (err instanceof CloseEvent) {
								return sink.error(
									// reason will be available on clean closes
									new Error(
										`Socket closed with event ${err.code} ${err.reason || ''}`,
									),
								);
							}

							return sink.error(
								new Error(
									(err as GraphQLError[])
										.map(({ message }) => message)
										.join(', '),
								),
							);
						},
					},
				);
			});
		} catch (error) {
			console.error(error);
		}
	}
	async function fetchQuery(
		operation: RequestParameters,
		variables: Variables,
	) {
		return fetch('http://localhost:4000/graphql', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				query: operation.text,
				variables,
			}),
		}).then((response) => {
			return response.json();
		});
	}
	// @ts-ignore
	const network = Network.create(fetchQuery, subscribe);

	const source = new RecordSource();
	const store = new Store(source, {
		gcReleaseBufferSize: 10,
	});
	return new Environment({ configName: 'env', network, store });
}

export const environment = createRelayEnvironment();
