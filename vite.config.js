import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { createHtmlPlugin } from 'vite-plugin-html';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function getPkgVersion(pkgPath) {
	return JSON.parse(readFileSync(resolve(pkgPath), 'utf-8')).version;
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		createHtmlPlugin({
			inject: {
				data: {
					viteVersion: getPkgVersion('./node_modules/vite/package.json'),
					sveltekitVersion: getPkgVersion('./node_modules/@sveltejs/kit/package.json')
				}
			}
		})
	]
});
