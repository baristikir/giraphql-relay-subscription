import SchemaBuilder from '@giraphql/core';
import SmartSubscriptionsPlugin, {
	subscribeOptionsFromIterator,
} from '@giraphql/plugin-smart-subscriptions';
import { IncomingMessage, OutgoingMessage } from 'http';
import { PubSub } from 'graphql-subscriptions';

export interface Context {
	req: IncomingMessage;
	res: OutgoingMessage;
	pubsub: PubSub;
}

export function createGraphQLContext(
	req: IncomingMessage,
	res: OutgoingMessage,
	pubsub: PubSub,
): Context {
	return {
		req,
		res,
		pubsub,
	};
}

export const builder = new SchemaBuilder<{
	// We change the defaults for arguments to be `required`. Any non-required
	// argument can be set to `required: false`.
	DefaultInputFieldRequiredness: true;
	Context: Context;
	Scalars: {
		// We modify the types for the `ID` type to denote that it's always a string when it comes in.
		ID: { Input: string; Output: string | number };
	};
	SmartSubscription: {
		debounceDelay: number | null;
		subscribe: (
			name: string,
			context: Context,
			cb: (err: unknown, data?: unknown) => void,
		) => Promise<void> | void;
		unsubscribe: (name: string, context: Context) => Promise<void> | void;
	};
}>({
	defaultInputFieldRequiredness: true,
	plugins: [SmartSubscriptionsPlugin],
	smartSubscriptions: {
		...subscribeOptionsFromIterator((name, { pubsub }) =>
			pubsub.asyncIterator(name),
		),
	},
});

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({});
builder.mutationType({});
builder.subscriptionType({});
