<script>
	// @ts-nocheck
	import MetaSeo from '$lib/components/MetaSEO.svelte';
	import ProfileSection from '$lib/components/ProfileSection.svelte';
	import RepositorySection from '$lib/components/RepositorySection.svelte';
	import { PUBLIC_GITHUB_USERNAME, PUBLIC_GITHUB_API_URL } from '$env/static/public';
	import { onMount } from 'svelte';

	let user = {
		nickname: PUBLIC_GITHUB_USERNAME,
		username: PUBLIC_GITHUB_USERNAME,
		bio: '',
		location: '',
		blog: '',
		company: '',
		avatarUrl: '/assets/img/placeholder.jpg',
		stats: { repositories: 0, followers: 0, following: 0 }
	};

	let repositories = [];

	onMount(async () => {
		const BASE_URL = PUBLIC_GITHUB_API_URL;
		const USERNAME = PUBLIC_GITHUB_USERNAME;

		try {
			const userResponse = await fetch(`${BASE_URL}/users/${USERNAME}`);
			if (!userResponse.ok)
				throw new Error(`[getDatas] ❌ Error retrieving GitHub user data of ${USERNAME}`);
			const userData = await userResponse.json();

			user.nickname = userData.name || userData.login[0].toUpperCase() + userData.login.slice(1);
			user.username = userData.login;
			user.avatarUrl = userData.avatar_url;
			user.stats = {
				repositories: userData.public_repos,
				followers: userData.followers,
				following: userData.following
			};
			user.bio = userData.bio;
			user.location = userData.location;
			user.blog = userData.blog;
			user.company = userData.company;

			console.log(
				`[getDatas] ✅ The user data of ${user.nickname || USERNAME} has been retrieved and transformed`,
				user
			);

			const reposResponse = await fetch(`${BASE_URL}/users/${USERNAME}/repos?per_page=100`);
			if (!reposResponse.ok)
				throw new Error(`[getDatas] ❌ Error retrieving GitHub repository data of ${USERNAME}`);
			const reposData = await reposResponse.json();

			repositories = reposData.filter(
				(/** @type {{ name: string; description: string; }} */ repo) => {
					const forbiddenNames = ['.github', 'DiscussionsHost'];
					const hasForbiddenWordInName = ['demo', 'backup', 'test', 'old'].some((word) =>
						repo.name.toLowerCase().includes(word)
					);
					const hasForbiddenDescription =
						repo.description && repo.description.toLowerCase().includes('just a redirect');

					return (
						!forbiddenNames.includes(repo.name) &&
						!hasForbiddenWordInName &&
						!hasForbiddenDescription
					);
				}
			);

			console.log(
				`[getDatas] ✅ The repositories of ${user.nickname || USERNAME} have been retrieved`,
				repositories
			);
		} catch (error) {
			console.error(`[getDatas] ❌ Error retrieving GitHub data of ${USERNAME}`, error);
		}
	});
</script>

<MetaSeo
	title={`Repositories — ${user.nickname} (@${user.username})`}
	description={`Discover all the GitHub Repositories and primary statistics for ${user.nickname} (@${user.username}) on this page.`}
/>

<ProfileSection
	nickname={user.nickname}
	username={user.username}
	avatarUrl={user.avatarUrl}
	stats={user.stats}
	bio={user.bio}
	location={user.location}
	blog={user.blog}
	company={user.company}
/>

<RepositorySection {repositories} />
