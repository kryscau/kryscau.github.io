<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error">
	<h1>{page.error?.message}</h1>
	<a href="/" class="btn-home" aria-label="Retour à l'accueil">Back to homepage</a>
</div>

<style>
	.error {
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: var(--gh-text-primary, #333);
		padding: 1rem;
	}

	.error h1 {
		font-size: 6rem;
		font-weight: 900;
		margin-bottom: 1rem;
		color: var(--gh-accent, #ff4500);
	}

	.btn-home {
		background-color: var(--gh-accent-emphasis, #ff6347);
		color: white;
		border: none;
		padding: 0.75rem 2rem;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.3s ease;
		text-decoration: none;
	}
	.btn-home:hover {
		background-color: var(--gh-accent, #ff4500);
	}
</style>
