import type { PageLoad } from './$types';

export const load = (() => ({
	title: '텍스트 다듬기',
	description:
		'불필요한 빈 줄 제거, 휴대전화 번호나 계좌번호의 줄표(-) 제거 등 여러 가지 문자열 도구를 제공합니다.'
})) satisfies PageLoad;
