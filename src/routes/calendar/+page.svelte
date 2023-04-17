<script lang="ts">
	import { version } from '$app/environment';

	const generateMatrix = (year: number, month: number) => {
		// Created date objects are in local timezones.
		const begin = new Date(year, month - 1, 1);
		const end = new Date(year, month, 0);

		if (Number.isNaN(begin.getTime()) || Number.isNaN(end.getTime())) throw TypeError();

		const beginDay = begin.getDay();
		const endDate = end.getDate();

		const week = new Array<number>(7).fill(0);
		const matrix: Array<typeof week> = [];

		matrix.push(week.map((v, index) => (index >= beginDay ? index - beginDay + 1 : v)));

		for (let i = 8 - beginDay; i <= endDate; i += 7) {
			matrix.push(week.map((v, index) => (i + index <= endDate ? i + index : v)));
		}

		return matrix;
	};

	const generateMonth = (date: Date = new Date()) =>
		`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

	let month = generateMonth(new Date(Number(version))); // yyyy-MM

	$: matrix =
		typeof month === 'string' &&
		/^\d{4}-\d{2}$/.test(month) &&
		generateMatrix(
			Number(month.substring(0, 4)), // yyyy
			Number(month.substring(5)) // MM
		);
</script>

<input bind:value={month} type="month" />
<button type="button" on:click={() => (month = generateMonth())}>이번 달</button>
{#if matrix}
	<table>
		<thead>
			<tr>
				<th>S</th>
				<th>M</th>
				<th>T</th>
				<th>W</th>
				<th>T</th>
				<th>F</th>
				<th>S</th>
			</tr>
		</thead>
		<tbody>
			{#each matrix as week}
				<tr>
					{#each week as day}
						<td>{day || ''}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<pre>{`[\n${matrix.map((week) => `  [${week.join(',')}]`).join(',\n')}\n]`}</pre>
{:else if month}
	<span class="warning">달력을 생성할 수 없습니다.</span>
{/if}

<style>
	input {
		margin-right: 0.5rem;
	}
	table,
	pre {
		margin-top: 1rem;
	}
	pre {
		user-select: text;
	}
	th,
	td {
		text-align: right;
		min-width: 2rem;
	}
	th:first-child,
	td:first-child {
		color: red;
	}
	.warning {
		display: inline-block;
	}
</style>
