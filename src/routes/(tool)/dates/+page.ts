import type { PageLoad } from './$types';

export const load = (() => ({
	title: '반복 날짜 생성',
	description:
		'월수금과 같이 정기적으로 열리는 모임, 수업 등의 일정 목록을 생성합니다. 시작일과 요일 조합을 입력합니다.'
})) satisfies PageLoad;
