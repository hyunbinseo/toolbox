<script lang="ts">
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

	let yearMonth = new Date().toLocaleDateString('en-CA').substring(0, 7);

	$: year = Number(yearMonth.substring(0, 4));
	$: month = Number(yearMonth.substring(5));
</script>

<input bind:value={yearMonth} type="month" />

{#if year && month}
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
			{#each generateMatrix(year, month) as week}
				<tr>
					{#each week as day}
						<td>{day || ''}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	table {
		margin-top: 1rem;
	}
	th,
	td {
		text-align: right;
	}
	th:first-child,
	td:first-child {
		color: red;
	}
</style>
