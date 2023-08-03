<script lang="ts">
	import { version } from '$app/environment';
	import { days, formatDateString, getDates } from '.';

	const totalCount = 50;

	let startDate = formatDateString({ date: new Date(Number(version)) });
	let selectedDays = [1, 3, 5];

	let excludeHolidays = true;
	let includeNumbering = true;
	let limitToCurrentMonth = true;

	// Should work regardless of system time-zone.
	$: dates = getDates({
		startDate,
		selectedDays,
		excludeHolidays,
		limitToCurrentMonth,
		totalCount
	});

	const copyDates = async (includeNumbering: boolean) => {
		const text = (includeNumbering ? dates.map((v, i) => `${i + 1}. ${v}`) : dates).join('\n');
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
		} finally {
			alert(`복사 완료 (순번 ${includeNumbering ? '포함' : '미포함'})`);
		}
	};
</script>

<form on:submit|preventDefault>
	<fieldset>
		<legend>시작 날짜</legend>
		<div class="start-date">
			<input bind:value={startDate} type="date" min="2022-01-01" />
			<div>
				<button type="button" on:click={() => (startDate = formatDateString({ dayOne: true }))}>
					이번 달 1일
				</button>
				<button type="button" on:click={() => (startDate = formatDateString())}>오늘</button>
				<button
					type="button"
					on:click={() => (startDate = formatDateString({ dayOne: true, nextMonth: true }))}
				>
					다음 달 1일
				</button>
			</div>
		</div>
	</fieldset>
	<fieldset class="days">
		<legend>요일</legend>
		{#each days as text, index (text)}
			<label>
				<input bind:group={selectedDays} type="checkbox" value={index} />
				{text}
			</label>
		{/each}
	</fieldset>
	<fieldset class="options">
		<legend>설정</legend>
		<label>
			<input type="checkbox" bind:checked={excludeHolidays} />
			<span>공휴일 제외 (월력요항 기준)</span>
		</label>
		<label>
			<input type="checkbox" bind:checked={limitToCurrentMonth} />
			<span>해당 월만 생성 (말일까지만)</span>
		</label>
		<label>
			<input type="checkbox" bind:checked={includeNumbering} />
			<span>순번 포함 복사 (1. 2. 3. …)</span>
		</label>
	</fieldset>
	<div class="list" style:padding={dates.length ? '0.75rem 2rem 0.5rem' : '1rem'}>
		{#if dates.length}
			<button on:click={() => copyDates(includeNumbering)}>날짜 목록 복사하기</button>
			<ol>
				{#each dates as date}
					<li>{date}</li>
				{/each}
			</ol>
		{:else if startDate}
			<span>해당하는 날짜가 없습니다.</span>
		{/if}
	</div>
</form>

<style>
	form > * {
		margin-top: 1rem;
	}
	.start-date {
		display: flex;
		flex-direction: column;
		width: fit-content;
		row-gap: 0.5rem;
	}
	.days > label {
		margin-right: 0.375rem;
	}
	.options > label {
		display: block;
	}
	.list {
		border: 2px solid;
		user-select: text;
	}
	li {
		padding-left: 0.375rem;
	}
	li::marker {
		font-weight: bold;
	}
	li:nth-child(10n + 1) {
		margin-top: 1rem;
	}
</style>
