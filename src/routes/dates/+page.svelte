<script lang="ts">
	import { version } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { copyText } from '$lib/utilities';
	import { onMount } from 'svelte';
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
		await copyText((includeNumbering ? dates.map((v, i) => `${i + 1}. ${v}`) : dates).join('\n'));
		alert(`복사 완료 (순번 ${includeNumbering ? '포함' : '미포함'})`);
	};

	const beginToday = () => (startDate = formatDateString());
	const beginThis1st = () => (startDate = formatDateString({ dayOne: true }));
	const beginNext1st = () => (startDate = formatDateString({ dayOne: true, nextMonth: true }));

	onMount(async () => {
		const days = $page.url.searchParams.get('days');
		if (days && /^0?1?2?3?4?5?6?$/.test(days))
			selectedDays = days.split('').map((index: string) => Number(index));

		const begin = $page.url.searchParams.get('begin');
		if (begin === 'today') beginToday();
		if (begin === 'this-1st') beginThis1st();
		if (begin === 'next-1st') beginNext1st();

		await goto($page.url.pathname, { replaceState: true });
	});
</script>

<form on:submit|preventDefault>
	<fieldset>
		<legend>시작 날짜</legend>
		<div class="start-date">
			<input bind:value={startDate} type="date" min="2022-01-01" />
			<div>
				<button type="button" on:click={beginThis1st}>이번 달 1일</button>
				<button type="button" on:click={beginToday}>오늘</button>
				<button type="button" on:click={beginNext1st}>다음 달 1일</button>
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
