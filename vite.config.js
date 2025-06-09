import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(__dirname, 'node_modules/vite/package.json');

const vitePkgRaw = await readFile(pkgPath, 'utf-8');
const viteVersion = JSON.parse(vitePkgRaw).version;

const sveltekitPkg = await import('@sveltejs/kit/package.json', { with: { type: 'json' } });
const sveltekitVersion = sveltekitPkg.default.version;

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__APP_MODE__: JSON.stringify(process.env.MODE),
		__VITE_VERSION__: JSON.stringify(viteVersion),
		__SVELTEKIT_VERSION__: JSON.stringify(sveltekitVersion)
	}
});
