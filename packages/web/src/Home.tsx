import { useState } from 'react';
import { graphql, useMutation, useSubscription } from 'react-relay';
import { HomeMutation } from './__generated__/HomeMutation.graphql';
import { HomeSubscription } from './__generated__/HomeSubscription.graphql';

export default function Home() {
	const [text, setText] = useState<string>();
	const [sayHi, isInFlight] = useMutation<HomeMutation>(graphql`
		mutation HomeMutation($text: String!) {
			sayHi(text: $text) {
				id
				text
			}
		}
	`);

	// As reference:  https://relay.dev/docs/api-reference/use-subscription/
	const subscription = useSubscription<HomeSubscription>({
		variables: {},
		subscription: graphql`
			subscription HomeSubscription {
				hello {
					id
					text
				}
			}
		`,
	});
	console.log('subscription: %o', subscription);

	return (
		<div className="flex flex-col p-12 items-center bg-[#222429] text-white h-screen w-full">
			<h1 className="text-7xl">Hello Vite + React + Relay!</h1>

			<div className="mt-12">
				<div className="flex flex-row space-x-4">
					<input
						type="text"
						onInput={(e) => void setText((e.target as HTMLInputElement).value)}
						placeholder="Enter a text here..."
						className="w-full px-4 py-3 outline-none text-gray-200 transition duration-300 focus:ring bg-gray-700 border-none focus:border focus:border-purple-100 focus:ring-purple-100  disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20"
					/>
					<button
						className="px-5 py-2 w-40 justify-center text-white  inline-flex items-center bg-blue-300"
						type="submit"
						onClick={() => {
							if (text !== undefined) {
								sayHi({ variables: { text: text as string } });
							}
						}}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
