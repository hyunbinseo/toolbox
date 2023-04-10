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

	// TODO: Utilize Date.toLocaleDateString() method.
	// new Date().toLocaleDateString('en-CA').substring(0, 7);
	// Reference https://github.com/sveltejs/kit/issues/9629

	let yearMonth = (() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, '0');
		return `${year}-${month}`;
	})();

	$: matrix = generateMatrix(
		Number(yearMonth.substring(0, 4)), // YYYY
		Number(yearMonth.substring(5)) // MM
	);
</script>

<input bind:value={yearMonth} type="month" />

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
	<textarea
		cols="24"
		rows={matrix.length + 2}
		value={`[\n${matrix.map((week) => ` [${week.join(',')}]`).join(',\n')}\n]`}
	/>
{/if}

<style>
	table,
	textarea {
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
