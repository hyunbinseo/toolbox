<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_TITLE } from '$env/static/public';
	import './styles.css';
</script>

<svelte:head>
	{#if $page.url.pathname === '/'}
		<title>{PUBLIC_TITLE}</title>
		<meta property="og:title" content="도구 목록" />
	{:else}
		<title>{$page.data.title} - {PUBLIC_TITLE}</title>
		<meta property="og:title" content={$page.data.title} />
	{/if}
	<meta name="description" content={$page.data.description} />
	<meta property="og:description" content={$page.data.description} />
	<meta property="og:site_name" content={PUBLIC_TITLE} />
	<meta property="og:type" content="website" />
</svelte:head>

<nav>
	<span>{PUBLIC_TITLE}</span>
	{#if $page.url.pathname !== '/'}
		<a href="/">목록으로</a>
	{/if}
</nav>

<hr />

<main><slot /></main>

<hr />

<footer>
	<a target="_blank" href="https://github.com/hyunbinseo">GitHub 프로필</a> ⋅
	<a target="_blank" href="https://github.com/hyunbinseo/tools#readme">저장소</a> ⋅
	<a href="https://github.com/hyunbinseo/tools/tree/main/src/routes{$page.route.id}">소스코드</a>
</footer>

<style>
	nav > span {
		font-weight: bold;
		margin-right: 0.5rem;
	}
	hr {
		margin: 1rem 0;
	}
</style>
