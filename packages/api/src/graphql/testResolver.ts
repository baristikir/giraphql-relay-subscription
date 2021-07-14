import { builder } from './builder';
import { Message } from '@prisma/client';
import { db } from '../utils/prisma';

const MessageObject = builder.objectRef<Message>('Message');
MessageObject.implement({
	fields: (t) => ({
		id: t.exposeID('id'),
		text: t.exposeString('text'),
	}),
});

builder.mutationField('sayHi', (t) =>
	t.field({
		type: MessageObject,
		args: {
			text: t.arg.string(),
		},
		resolve: async (_root, { text }, { pubsub }) => {
			await pubsub.publish('message-added', { text });
			console.log(text);
			try {
				const message = await db.message.create({
					data: { text },
				});
				console.log('Message: %o', message);
				return message;
			} catch (error) {
				throw new Error(error);
			}
		},
	}),
);
builder.queryField('hello', (t) =>
	t.field({
		type: [MessageObject],
		smartSubscription: true,
		subscribe: (subscriptions) => subscriptions.register('message-added'),
		resolve: (_root, _args, _ctx) => {
			return db.message.findMany();
		},
	}),
);
