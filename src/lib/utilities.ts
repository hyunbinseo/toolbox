import { browser } from '$app/environment';

export const copyText = async (text: string) => {
	if (!browser) throw new Error();
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		// e.g. Android KakaoTalk in-app browser
		const element = document.createElement('textarea');
		element.value = text;
		document.body.appendChild(element);
		element.select();
		document.execCommand('copy');
		document.body.removeChild(element);
	}
};
