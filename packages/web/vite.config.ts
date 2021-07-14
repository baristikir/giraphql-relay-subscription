import path from 'path';
import { defineConfig } from 'vite';
import relay from 'vite-plugin-relay';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), relay],
	resolve: {
		alias: { '~': path.resolve(__dirname, 'src') },
	},
	esbuild: {
		jsxInject: `import React from 'react'`,
	},
	define: {
		global: 'globalThis',
	},
});
