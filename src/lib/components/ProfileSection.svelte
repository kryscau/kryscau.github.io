<script>
	export let nickname = '';
	export let username = '';
	export let avatarUrl = '';
	export let stats = { repositories: 0, followers: 0, following: 0 };
	export let bio = '';
	export let location = '';
	export let blog = '';
	export let company = '';
</script>

<!-- Profile Section -->
<div
	class="gh-bg-secondary mb-8 rounded-2xl border p-6 sm:p-8"
	style="border: 1px solid var(--gh-border)"
>
	<div
		class="flex flex-col items-center space-y-6 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-8"
	>
		<!-- Left side: Avatar + Info -->
		<div
			class="flex flex-1 flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6"
		>
			<!-- Avatar -->
			<div class="relative">
				<img
					src={avatarUrl || '/assets/img/placeholder.jpg'}
					alt={`${username || 'Placeholder'}'s avatar`}
					draggable="false"
					class="h-24 w-24 rounded-full border-4 sm:h-32 sm:w-32"
					style="border-color: var(--gh-border)"
				/>
			</div>

			<!-- Profile Info -->
			<div class="flex-1 text-center sm:text-left">
				{#if nickname}
					<h1 class="text-gh-text mb-2 text-2xl font-bold sm:text-3xl">{nickname}</h1>
				{/if}

				{#if username}
					<p class="text-gh-text-secondary mb-3">@{username}</p>
				{/if}

				{#if location || blog || company}
					<div
						class="gh-text-secondary mb-4 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start"
					>
						{#if location}
							<div class="flex items-center space-x-1">
								<i class="fas fa-map-marker-alt gh-text-muted"></i>
								<span>{location}</span>
							</div>
						{/if}

						{#if company}
							<div class="flex items-center space-x-1">
								<i class="fas fa-building gh-text-muted"></i>
								<span>{company}</span>
							</div>
						{/if}

						{#if blog}
							<div class="flex items-center space-x-1">
								<i class="fas fa-blog gh-text-muted"></i>
								<a
									href={blog}
									target="_blank"
									title="Visit my blog"
									rel="noopener noreferrer"
									class="transition-colors duration-300 hover:text-white"
								>
									<span>{blog.replace(/^https?:\/\/(www\.)?/, '')}</span>
								</a>
							</div>
						{/if}
					</div>
				{/if}

				{#if bio}
					<p class="text-gh-text-secondary mb-6 max-w-md" title={bio}>{bio}</p>
				{/if}
			</div>
		</div>

		<!-- Right side: Stats boxes -->
		<div class="flex flex-col space-y-3 lg:min-w-[200px]">
			<!-- Repos Box -->
			<div
				class="gh-bg-tertiary hover:border-gh-accent rounded-lg border p-1 text-center transition-colors"
				style="border: 1px solid var(--gh-border)"
			>
				<div class="gh-text text-2xl font-bold">{stats.repositories}</div>
				<div class="gh-text-secondary text-sm">Owned Repos</div>
			</div>

			<!-- Followers Box -->
			<div
				class="gh-bg-tertiary hover:border-gh-accent rounded-lg border p-1 text-center transition-colors"
				style="border: 1px solid var(--gh-border)"
			>
				<div class="gh-text text-2xl font-bold">{stats.followers}</div>
				<div class="gh-text-secondary text-sm">Followers</div>
			</div>

			<!-- Following Box -->
			<div
				class="gh-bg-tertiary hover:border-gh-accent rounded-lg border p-1 text-center transition-colors"
				style="border: 1px solid var(--gh-border)"
			>
				<div class="gh-text text-2xl font-bold">{stats.following}</div>
				<div class="gh-text-secondary text-sm">Following</div>
			</div>
		</div>
	</div>
</div>
