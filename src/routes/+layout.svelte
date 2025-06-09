<script>
	import '$lib/css/tailwind.css';
	import '$lib/css/main.css';

	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import Navigation from '$lib/components/Navigation.svelte';
	import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';

	let { children } = $props();

	const canonicalUrl = derived(page, ($page) => {
		// Ex : https://username.github.io/#/path
		// Remplace '/' au début
		const path = $page.url.pathname.replace(/^\//, '');
		return `https://${PUBLIC_GITHUB_USERNAME}.github.io/${path}`;
	});
</script>

<svelte:head>
	<link rel="canonical" href={$canonicalUrl} />
	<meta property="og:url" content={$canonicalUrl} />
</svelte:head>

<div class="app">
	<Navigation username={PUBLIC_GITHUB_USERNAME} />
	<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
		<div
			class="gh-bg-secondary mb-8 rounded-2xl border p-6 sm:p-8"
			style="border: 1px solid var(--gh-border)"
		>
			<main>
				{@render children()}
			</main>
		</div>
	</div>
</div>
