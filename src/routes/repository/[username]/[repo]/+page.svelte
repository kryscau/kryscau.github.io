<script>
	// @ts-nocheck

	import { PUBLIC_GITHUB_API_URL } from '$env/static/public';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';

	/**
	 * @type {string}
	 */
	let username;
	/**
	 * @type {string}
	 */
	let repo;

	const unsubscribe = page.subscribe(($page) => {
		username = $page.params.username;
		repo = $page.params.repo;
	});

	onDestroy(() => unsubscribe());

	import { onMount } from 'svelte';
	import LangBadge from '$lib/components/ui/LangBadge.svelte'; // adapte selon ton dossier
	import { formatDistanceToNow } from 'date-fns';

	let dataRepo = {
		repository: null,
		languages: {},
		contributors: []
	};

	/**
	 * @type {null}
	 */
	let error = null;

	const fetchData = async () => {
		error = null;

		try {
			const repoRes = await fetch(`${PUBLIC_GITHUB_API_URL}/repos/${username}/${repo}`);
			if (!repoRes.ok) throw new Error('Unable to retrieve info from repo');
			const repoData = await repoRes.json();

			const langRes = await fetch(`${PUBLIC_GITHUB_API_URL}/repos/${username}/${repo}/languages`);
			if (!langRes.ok) throw new Error('Unable to retrieve languages');
			const languagesData = await langRes.json();

			const contRes = await fetch(
				`${PUBLIC_GITHUB_API_URL}/repos/${username}/${repo}/contributors`
			);
			if (!contRes.ok) throw new Error('Unable to retrieve contributors');
			const contributorsData = await contRes.json();

			// Calcul pourcentages langages
			const total = Object.values(languagesData).reduce((a, b) => a + b, 0);
			const languagesWithPercent = {};
			for (const [lang, bytes] of Object.entries(languagesData)) {
				languagesWithPercent[lang] = (bytes / total) * 100;
			}

			dataRepo = {
				repository: repoData,
				languages: languagesWithPercent,
				contributors: contributorsData
			};
		} catch (e) {
			error = e.message;
			dataRepo = { repository: null, languages: {}, contributors: [] };
		}
	};

	const formatDate = (date) => {
		if (!date) return 'Date inconnue';
		return formatDistanceToNow(new Date(date), { addSuffix: true });
	};

	onMount(() => {
		fetchData();
	});
</script>

{#if error}
	<div class="mb-6 rounded bg-red-600 p-4 text-white">
		⚠️ {error} — Try again later, you may have exceeded the GitHub API limit without a token.
	</div>
{:else if !dataRepo.repository}
	<div>Loading...</div>
{:else}
	<div
		class="gh-bg-secondary mb-8 rounded-2xl border p-6 sm:p-8"
		style="border: 1px solid var(--gh-border)"
	>
		<div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<div class="mb-4 flex items-center space-x-3 sm:mb-0">
				<i class="fas fa-folder-open gh-accent text-2xl"></i>
				<div>
					<h1 class="gh-text text-2xl font-bold sm:text-3xl">
						{dataRepo?.repository?.full_name}
					</h1>
					<span
						class="gh-success mt-3 inline-block rounded-full border px-2 py-1 text-xs"
						style="background-color: rgba(63, 185, 80, 0.2); border-color: rgba(63, 185, 80, 0.3)"
					>
						{dataRepo?.repository?.visibility?.toUpperCase()}
					</span>
					{#if dataRepo?.repository?.archived}
						<span
							class="mt-3 ml-2 inline-block rounded-full border bg-orange-700/25 px-2 py-1 text-xs text-orange-500"
						>
							ARCHIVED
						</span>
					{/if}
				</div>
			</div>
			<div class="flex flex-col gap-3 sm:flex-row">
				{#if dataRepo?.repository?.html_url}
					<a href={dataRepo?.repository?.html_url} target="_blank" rel="noopener noreferrer">
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

				{#if dataRepo?.repository?.homepage}
					<a href={dataRepo?.repository?.homepage} target="_blank" rel="noopener noreferrer">
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
		</div>

		<p class="gh-text-secondary mb-4">
			{dataRepo?.repository?.description || 'No description has been set.'}
		</p>

		{#if dataRepo?.repository?.created_at || dataRepo?.repository?.updated_at}
			<div class="gh-text-secondary flex flex-wrap items-center gap-4 text-sm">
				{#if dataRepo?.repository?.created_at}
					<div class="flex items-center space-x-1">
						<i class="fas fa-calendar-plus gh-text-muted"></i>
						<span>Created {formatDate(dataRepo?.repository?.created_at)}</span>
					</div>
				{/if}

				{#if dataRepo?.repository?.updated_at}
					<div class="flex items-center space-x-1">
						<i class="fas fa-sync-alt gh-text-muted"></i>
						<span>Updated {formatDate(dataRepo?.repository?.updated_at)}</span>
					</div>
				{/if}
			</div>
		{/if}
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- Statistics -->
		<div class="lg:col-span-2">
			<div
				class="gh-bg-secondary mb-8 rounded-2xl border p-6 sm:p-8"
				style="border: 1px solid var(--gh-border)"
			>
				<div class="mb-6 flex items-center space-x-3">
					<i class="fas fa-chart-bar gh-accent text-xl"></i>
					<h2 class="gh-text text-xl font-bold">Statistics</h2>
				</div>

				<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
					<div
						class="gh-bg-tertiary stat-card stars rounded-xl border border-[var(--gh-border)] p-4 text-center transition-colors hover:border-yellow-400"
					>
						<i class="fas fa-star gh-attention mb-2 text-2xl"></i>
						<div class="gh-text text-2xl font-bold">{dataRepo?.repository?.stargazers_count}</div>
						<div class="gh-text-secondary text-sm">Stars</div>
					</div>
					<div
						class="gh-bg-tertiary stat-card forks rounded-xl border border-[var(--gh-border)] p-4 text-center transition-colors hover:border-blue-400"
					>
						<i class="fas fa-code-branch gh-accent mb-2 text-2xl"></i>
						<div class="gh-text text-2xl font-bold">{dataRepo?.repository?.forks_count}</div>
						<div class="gh-text-secondary text-sm">Forks</div>
					</div>
					<div
						class="gh-bg-tertiary stat-card watchers rounded-xl border border-[var(--gh-border)] p-4 text-center transition-colors hover:border-green-400"
					>
						<i class="fas fa-eye gh-success mb-2 text-2xl"></i>
						<div class="gh-text text-2xl font-bold">{dataRepo?.repository?.watchers_count}</div>
						<div class="gh-text-secondary text-sm">Watchers</div>
					</div>
					<div
						class="gh-bg-tertiary stat-card issues rounded-xl border border-[var(--gh-border)] p-4 text-center transition-colors hover:border-red-400"
					>
						<i class="fas fa-exclamation-triangle gh-danger mb-2 text-2xl"></i>
						<div class="gh-text text-2xl font-bold">
							{dataRepo?.repository?.open_issues_count}
						</div>
						<div class="gh-text-secondary text-sm">Issues</div>
					</div>
				</div>
			</div>

			<!-- Languages -->
			<div
				class="gh-bg-secondary rounded-2xl border p-6 sm:p-8"
				style="border: 1px solid var(--gh-border)"
			>
				<div class="mb-6 flex items-center space-x-3">
					<i class="fas fa-code gh-accent text-xl"></i>
					<h2 class="gh-text text-xl font-bold">Languages</h2>
				</div>

				<div class="space-y-4">
					{#each Object.entries(dataRepo.languages) as [language, percent]}
						<LangBadge lang={language} {percent} mode="bar" />
					{/each}
				</div>
			</div>
		</div>

		<!-- Contributors -->
		<div class="lg:col-span-1">
			<div
				class="gh-bg-secondary rounded-2xl border p-6 sm:p-8"
				style="border: 1px solid var(--gh-border)"
			>
				<div class="mb-6 flex items-center space-x-3">
					<i class="fas fa-users gh-accent text-xl"></i>
					<h2 class="gh-text text-xl font-bold">Contributors ({dataRepo.contributors.length})</h2>
				</div>

				<div class="space-y-4">
					{#each dataRepo.contributors as contributor}
						<div
							class="gh-bg-tertiary flex items-center space-x-3 rounded-xl border p-3 transition-colors hover:bg-gray-600"
							style="border: 1px solid var(--gh-border-muted)"
						>
							<img
								src={contributor.avatar_url || '/assets/img/placeholder.jpg'}
								alt={contributor.login}
								class="h-10 w-10 rounded-full border-2"
								style="border-color: var(--gh-border)"
							/>
							<div class="flex-1">
								<a
									href={contributor.html_url}
									title="See him on GitHub"
									target="_blank"
									rel="noopener"
								>
									<div class="gh-text font-medium">{contributor.login}</div>
								</a>
								<div class="gh-text-secondary text-sm">
									{contributor.contributions} contributions
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
