<script>
	import LangBadge from './LangBadge.svelte';
	import { formatDistanceToNow } from 'date-fns';

	export let repo;

	const formatDate = (date) => {
		if (!date) return 'Unknown date';
		return formatDistanceToNow(new Date(date), { addSuffix: true });
	};

	const repoFullName = repo.full_name || `${repo.owner.login}/${repo.name}`;

	const repoUrl = `https://github.com/${repoFullName}`;
	const stargazersUrl = `${repoUrl}/stargazers`;
	const forksUrl = `${repoUrl}/network/members`;
	const langSearchUrl = `https://github.com/search?q=user:${repo.owner.login}+language:${repo.language}`;
</script>

<article
	class="repo-card bg-gh-bg-secondary border-gh-border hover:border-gh-accent relative cursor-default rounded-2xl border p-6 shadow-md transition-shadow hover:shadow-lg"
	aria-label={`Repository card for ${repoFullName}`}
>
	<header class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div class="text-gh-accent flex max-w-full items-center gap-2 truncate text-lg font-semibold">
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<a
				href={`/repository/${repoFullName.toLowerCase()}`}
				rel="noopener noreferrer"
				title={`Open ${repoFullName}'s summary`}
			>
				<span
					class="text-gh-accent hover:text-gh-accent-emphasis cursor-help"
					title="Click to see detailed summary on this site"
					aria-label="Repository summary available"
				>
					<i class="fas fa-eye"></i>
				</span>
			</a>
			{repoFullName}
		</div>
		<div class="text-gh-text-secondary mt-3 flex space-x-5 text-sm sm:mt-0">
			<a
				href={stargazersUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-gh-attention flex cursor-pointer items-center space-x-1 transition-colors"
				title="View stargazers"
			>
				<i class="fas fa-star"></i>
				<span>{repo.stargazers_count || 0}</span>
			</a>
			<a
				href={forksUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-gh-accent flex cursor-pointer items-center space-x-1 transition-colors"
				title="View forks"
			>
				<i class="fas fa-code-branch"></i>
				<span>{repo.forks_count || 0}</span>
			</a>
		</div>
	</header>

	<p class="text-gh-text-secondary min-h-[3rem]">
		{repo.description || 'No description has been set.'}
	</p>

	<footer
		class="text-gh-text-secondary flex flex-col items-center justify-between text-sm sm:flex-row"
	>
		<div class="flex flex-col items-center gap-2 sm:flex-row">
			{#if repo.language}
				<a
					href={langSearchUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-gh-accent flex cursor-pointer items-center space-x-2 transition-colors"
					title={`See all repos by language: ${repo.language}`}
				>
					<LangBadge lang={repo.language} />
				</a>
			{/if}
			{#if repo.updated_at}
				<span title={`Last updated on ${new Date(repo.updated_at).toLocaleDateString()}`}>
					Updated {formatDate(repo.updated_at)}
				</span>
			{/if}
			{#if repo.created_at}
				<span title={`Created on ${new Date(repo.created_at).toLocaleDateString()}`}>
					Created {formatDate(repo.created_at)}
				</span>
			{/if}
		</div>
		<div class="flex items-center gap-4" role="group" aria-label="Repository external links">
			{#if repo.html_url}
				<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
					<button
						class="gh-bg-tertiary gh-text flex items-center justify-center space-x-2 rounded-lg border px-4 py-2 transition-colors hover:bg-gray-600"
						style="border: 1px solid var(--gh-border)"
						type="button"
					>
						<i class="fas fa-code"></i>
						<span>View Code</span>
					</button>
				</a>
			{/if}
			{#if repo.homepage}
				<a href={repo.homepage} target="_blank" rel="noopener noreferrer">
					<button
						class="bg-gh-accent-emphasis hover:bg-gh-accent flex items-center justify-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors"
						type="button"
					>
						<i class="fas fa-external-link-alt"></i>
						<span>View Site</span>
					</button>
				</a>
			{/if}
		</div>
	</footer>
</article>

<style>
	.repo-card {
		background-color: var(--gh-bg-secondary);
		border-color: var(--gh-border);
		color: var(--gh-text-secondary);
		position: relative;
	}

	.repo-card:hover {
		border-color: var(--gh-accent);
		box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
		color: var(--gh-text);
	}

	a {
		text-decoration: none;
	}

	/* Styles pour les écrans de PC */
	@media (min-width: 641px) {
		.repo-card {
			padding: 1.5rem;
		}

		.repo-card footer {
			flex-direction: row;
			justify-content: space-between;
		}

		.repo-card footer div[role='group'] {
			flex-direction: row;
			margin-top: 15px;
		}
	}

	/* Styles pour les écrans de téléphone */
	@media (max-width: 640px) {
		.repo-card {
			padding: 1rem;
		}

		.repo-card header {
			flex-direction: column;
			align-items: center;
		}

		.repo-card footer {
			flex-direction: column;
			align-items: center;
		}

		.repo-card footer div:first-child {
			flex-direction: column;
			align-items: center;
		}

		.repo-card footer div[role='group'] {
			flex-direction: row;
			justify-content: center;
			width: 100%;
			margin-top: 15px;
		}

		.repo-card footer button {
			flex: 1;
		}
	}
</style>
