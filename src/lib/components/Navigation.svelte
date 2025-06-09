<script>
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { onMount } from 'svelte';

	export let username = '';
	const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

	const isRepositoryPage = derived(page, ($page) => {
		return (
			$page.url.pathname.startsWith('/repository/') || $page.url.hash.startsWith('#/repository/')
		);
	});

	function goBack() {
		history.back();
	}

	// (Optionnel) Menu mobile toggle si besoin
	onMount(() => {
		const menuButton = document.querySelector('button[data-toggle="mobile-menu"]');
		if (menuButton) {
			menuButton.addEventListener('click', () => {
				console.log('Mobile menu clicked');
			});
		}
	});
</script>

<nav
	class="gh-bg-secondary gh-border sticky top-0 z-50 border-b"
	style="border-bottom: 1px solid var(--gh-border)"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" rel="noopener nofollow">
				<div class="flex items-center space-x-3">
					<i class="fab fa-github text-gh-text text-2xl"></i>
					<span class="text-gh-text text-xl font-semibold">
						<span id="username">{formattedUsername}</span>'s Repositories
					</span>
				</div>
			</a>

			{#if $isRepositoryPage}
				<div class="flex items-center space-x-3 text-white">
					<button
						on:click={goBack}
						class="gh-accent flex items-center space-x-2 text-white transition-colors hover:opacity-80"
					>
						<i class="fas fa-arrow-left"></i>
						<span class="hidden text-white sm:inline">Back to Repositories</span>
					</button>
				</div>
			{/if}
		</div>
	</div>
</nav>
