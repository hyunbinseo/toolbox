import type { PageLoad } from './$types';

export const load = (() => ({
	title: '26주 적금 계산기',
	description:
		'카카오뱅크 풍차 돌리기 - 매주 신규 계좌를 개설해 1만 원씩 증액하도록 했을 때 - 납입해야 하는 주차별 금액을 정리합니다.'
})) satisfies PageLoad;
