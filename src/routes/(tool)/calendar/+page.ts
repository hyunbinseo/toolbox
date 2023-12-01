import type { PageLoad } from './$types';

export const load = (() => ({
	title: '달력 배열 생성',
	description:
		'연월에 해당하는 해당하는 JSON 데이터를 생성합니다. 이를 산출하는 자바스크립트 알고리즘도 제공합니다.'
})) satisfies PageLoad;
