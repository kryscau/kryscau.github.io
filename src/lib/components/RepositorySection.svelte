<script>
	import { formatDistanceToNow } from 'date-fns';
	import LangBadge from './ui/LangBadge.svelte';
	import RepoCard from './ui/RepoCard.svelte';

	/**
	 * @type {any[]}
	 */
	export let repositories = [];

	function formatDate(date) {
		if (!date) return 'Unknown date';
		return formatDistanceToNow(new Date(date), { addSuffix: true });
	}
</script>

<div
	class="gh-bg-secondary rounded-2xl border p-6 sm:p-8"
	style="border: 1px solid var(--gh-border)"
>
	<div class="mb-6 flex items-center space-x-3">
		<i class="fas fa-folder-open text-gh-accent text-xl"></i>
		<h2 class="text-gh-text text-xl font-bold sm:text-2xl">My public repositories</h2>
	</div>

	<div class="space-y-4">
		{#each repositories as repo (repo.id)}
			<RepoCard {repo} />
		{/each}
	</div>
</div>

<style>
	.repo-card:hover {
		border-color: rgba(var(--gh-accent-rgba), 0.5) !important;
	}
</style>
