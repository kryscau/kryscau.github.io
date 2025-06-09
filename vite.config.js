import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__APP_MODE__: JSON.stringify(process.env.MODE),
		__VITE_VERSION__: JSON.stringify(require('vite/package.json').version),
		__SVELTEKIT_VERSION__: JSON.stringify(require('@sveltejs/kit/package.json').version)
	}
});
