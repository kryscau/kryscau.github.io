<script>
	import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';

	export let title = 'Default Title';
	export let description = 'Default description for the page.';
	export let imageUrl = 'https://example.com/default-image.jpg';
	export let author = `Kryscau for @${PUBLIC_GITHUB_USERNAME}`;
	export let keywords = 'default, keywords, for, seo';
	export let robots = 'index, follow';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="author" content={author} />
	<meta name="keywords" content={keywords} />
	<meta name="robots" content={robots} />
</svelte:head>
