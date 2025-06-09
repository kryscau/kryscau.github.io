<script>
	import colors from '$lib/data/colors.json';

	export let lang = '';
	export let percent = 0;
	export let mode = 'badge'; // badge ou bar

	// couleur récupérée dans le JSON
	const color = colors[lang]?.color || '#4b5563'; // gris par défaut

	// opacity 20%
	const opacity20 = color + '33';
</script>

{#if mode === 'badge'}
	<div
		class="inline-flex items-center space-x-1 rounded px-2 py-0.5 text-sm font-medium"
		style="background-color: {opacity20}; color: {color};"
	>
		<span class="h-2.5 w-2.5 rounded-full" style="background-color: {color};"></span>
		<span>{lang}</span>
	</div>
{:else if mode === 'bar'}
	<div>
		<div class="mb-2 flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<div class="h-3 w-3 rounded-full" style="background-color: {color};"></div>
				<span class="gh-text font-medium">{lang}</span>
			</div>
			<span class="gh-text-secondary text-sm">{percent.toFixed(1)}%</span>
		</div>
		<div class="bg-gh-border-muted h-2 w-full rounded-full">
			<div class="h-2 rounded-full" style="width: {percent}%; background-color: {color};"></div>
		</div>
	</div>
{/if}
