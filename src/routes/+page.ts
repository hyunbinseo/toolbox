import type { PageLoad } from './$types';

export const load = (async () => ({
	title: '도구 목록',
	description:
		'웹에서 간편하게 사용할 수 있는 유틸리티 모음집입니다. 모든 소스코드는 공개돼 있으며, 오픈소스 라이선스에 따라 자유롭게 활용할 수 있습니다.',
	tools: await Promise.all(
		// FIXME The following glob pattern does not work.
		// import.meta.glob('./(tool)/*/+page.ts') // {}
		Object.entries(import.meta.glob('./**/*/+page.ts')).map(async ([path, fn]) => ({
			path: path.replace('./(tool)', '').replace('/+page.ts', ''),
			...((await fn()) as { load: () => App.PageData }).load()
		}))
	)
})) satisfies PageLoad;
