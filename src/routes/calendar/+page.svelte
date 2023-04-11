<script lang="ts">
	import { onMount } from 'svelte';

	const isInvalidDate = (date: Date) => date.toString() === 'Invalid Date';

	const generateMatrix = (year: number, month: number) => {
		// Created date objects are in local timezones.
		const begin = new Date(year, month - 1, 1);
		const end = new Date(year, month, 0);

		if (isInvalidDate(begin) || isInvalidDate(end)) throw TypeError();

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

	let month: undefined | `${string}-${string}`; // YYYY-MM

	onMount(() => {
		const now = new Date();
		month = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
	});

	$: matrix =
		month &&
		generateMatrix(
			Number(month.substring(0, 4)), // YYYY
			Number(month.substring(5)) // MM
		);
</script>

<input bind:value={month} type="month" />

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
{/if}

<style>
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
</style>
