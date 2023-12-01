import type { PageLoad } from './$types';

export const load = (() => ({
	title: '무작위 숫자 생성',
	description:
		'입력된 자릿수에 맞춰 무작위 문자열을 생성합니다. 계좌 및 휴대전화 비밀번호에 사용되는 PIN 코드 생성 용도로 사용해도 됩니다.'
})) satisfies PageLoad;
