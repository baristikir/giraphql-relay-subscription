module.exports = {
	// ...
	// Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
	src: '.',
	schema: './schema.graphql',
	exclude: ['**/node_modules/**', '**/__generated__/**'],
	extensions: ['ts', 'tsx'],
	language: 'typescript',
};
