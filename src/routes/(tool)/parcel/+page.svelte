<script lang="ts">
	const presets = {
		CJ대한통운: 'https://www.cjlogistics.com/ko/tool/parcel/newTracking?gnbInvcNo=',
		SLX택배: 'https://net.slx.co.kr/info/tracking.jsp?iv_no=',
		경동택배: 'https://kdexp.com/service/delivery/etc/delivery.do?barcode=',
		로젠택배: 'https://www.ilogen.com/web/personal/trace/',
		롯데택배: 'https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo=',
		// PC version of the website requires a POST request using HTTP.
		// http://trace.epost.go.kr/xtts/servlet/kpl.tts.common.svl.SttSVL
		// Therefore, it shows the following warning message on Chrome.
		// 안전하지 않은 정보를 제출하려 함. 안전하지 않은 연결을 통해 이 양식이 제출되므로 내 정보가 다른 사용자에게 표시됩니다.
		우체국: 'https://m.epost.go.kr/postal/mobile/mobile.trace.RetrieveDomRigiTraceList.comm?sid1=',
		한진택배:
			'https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&schLang=KR&wblnumText2=',
		천일택배: 'https://www.chunil.co.kr/HTrace/HTrace.jsp?transNo=',
		큐익스프레스: 'https://www.qxpress.net/Customer/PopupTraceParcels?TrackingNo=',
		딜리박스: 'https://www.dbox.co.kr/delivery.php?laasInvcNo='
	} satisfies Record<string, `https://${string}`>;

	let urls: string[] = [];

	let blink = false;
	let blinkTimeout: number;

	const handleFormSubmit = (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;

		const formData = new FormData(form as HTMLFormElement);
		const name = formData.get('name');
		const id = formData.get('id');

		if (!name || !id) return;

		const url = presets[name as keyof typeof presets] + (id as string).replace(/[-_]/g, '');

		if (urls.includes(url)) {
			alert('이미 조회된 운송장입니다.');
			return;
		}

		urls = [url, ...urls];

		if (blinkTimeout) clearTimeout(blinkTimeout);

		blink = true;

		blinkTimeout = setTimeout(() => (blink = false), 2000);

		const input = form.querySelector("input[name='id']");

		if (!input) return;

		(input as HTMLInputElement).value = '';
	};
</script>

<form on:submit|preventDefault={handleFormSubmit}>
	<fieldset>
		<legend>운송장 정보</legend>
		<div class="control">
			<select name="name">
				{#each Object.keys(presets) as name}
					<option>{name}</option>
				{/each}
			</select>
			<input
				name="id"
				type="text"
				placeholder="등기번호/송장번호"
				pattern="^\d[\d\-_]+\d$"
				title="숫자, -, _만 입력하세요."
				required
			/>
			<button>URL 생성</button>
		</div>
	</fieldset>

	<fieldset class="result">
		<legend>배송 조회 URL</legend>
		<ul class:blink>
			{#if !urls.length}
				<li>조회된 운송장이 없습니다.</li>
			{:else}
				{#each urls as url (url)}
					<li>
						<a href={url} target="_blank">
							<span>{url}</span>
						</a>
					</li>
				{/each}
			{/if}
		</ul>
	</fieldset>
</form>

<style>
	form > * {
		margin-top: 1rem;
	}
	fieldset {
		min-width: 0;
	}
	ul {
		user-select: text;
	}
	/* FIXME: List disc is not shown in Safari (13.3.1). */
	li > a {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	ul.blink > li:first-child > a > span {
		background-color: yellow;
	}
	@media (max-width: 575px) {
		div.control {
			display: flex;
			flex-direction: column;
		}
		div.control > * {
			margin-top: 0.375rem;
		}
	}
</style>
