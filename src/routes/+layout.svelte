<script lang="ts">
	import { page } from '$app/stores';

	const paths = Object.keys(import.meta.glob('./[a-z]+/+page.svelte')).map((path) =>
		path.replace(/^\.\//, '').replace(/\/\+page\.svelte$/, '')
	);

	$: currentPath = $page.url.pathname.substring(1);
	$: remainingPaths = paths.filter((path) => path !== currentPath);

	const capitalizeWord = (text: string) => `${text.charAt(0).toUpperCase()}${text.substring(1)}`;
</script>

<svelte:head>
	<title>{capitalizeWord(currentPath)} Tools by Hyunbin</title>
</svelte:head>

<nav>
	<span>{currentPath || 'Home'}</span>
	{#each remainingPaths as path (path)}
		<a href="/{path}">{path}</a>
	{/each}
</nav>

<hr />

<slot />

<hr />

<footer>
	Tools by <a href="https://github.com/hyunbinseo/">Hyunbin</a>
	(<a href="https://github.com/hyunbinseo/tools">Source</a>)
</footer>

<style>
	hr {
		margin: 1rem 0;
	}
	nav {
		display: flex;
		gap: 0.5rem;
	}
	nav > span {
		font-weight: bold;
		margin-right: 0.5rem;
	}
	nav > span,
	nav a {
		text-transform: capitalize;
	}
</style>
