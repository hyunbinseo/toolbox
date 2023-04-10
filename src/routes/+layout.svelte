<script lang="ts">
	import { page } from '$app/stores';

	const tools = {
		'/text': {
			name: '텍스트 다듬기',
			description:
				'불필요한 빈 줄 제거, 휴대전화 번호나 계좌번호의 줄표(-) 제거 등 여러 가지 문자열 도구를 제공합니다.'
		},
		'/calendar': {
			name: '월간 달력 생성',
			description:
				'연월에 해당하는 해당하는 JSON 데이터를 생성합니다. 이를 산출하는 자바스크립트 알고리즘도 제공합니다.'
		}
	} satisfies Record<`/${string}`, { name: string; description: `${string}.` }>;

	const { VITE_TITLE: title } = import.meta.env;
	$: tool = tools[$page.url.pathname as keyof typeof tools];

	$: pageTitle = tool ? `${tool.name} - ${title}` : title;
	$: pageDescription = tool
		? tool.description
		: '웹에서 간편하게 사용할 수 있는 유틸리티 모음집입니다. 모든 소스코드는 공개돼 있으며, 오픈소스 라이선스에 따라 자유롭게 활용할 수 있습니다.';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
</svelte:head>

<nav>
	<span>{title}</span>
	{#if $page.url.pathname !== '/'}
		<a href="/">목록으로</a>
	{/if}
</nav>

<hr />

<main>
	{#if !tool}
		<ol>
			{#each Object.entries(tools) as [href, { name }]}
				<li><a {href}>{name}</a></li>
			{/each}
		</ol>
	{:else}
		<h1>{tool.name}</h1>
		<slot />
	{/if}
</main>

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
