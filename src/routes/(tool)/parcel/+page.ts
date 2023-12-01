import type { PageLoad } from './$types';

export const load = (() => ({
	title: '택배 배송 조회',
	description:
		'등기, 소포 등의 현황을 확인할 수 있는 링크를 생성합니다. 운송장 번호가 포함된 공유 가능한 URL입니다.'
})) satisfies PageLoad;
