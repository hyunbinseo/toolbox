<script lang="ts">
	import { generateMatrix } from './matrix';

	let yearMonth: string;

	$: year = yearMonth && Number(yearMonth.substring(0, 4));
	$: month = yearMonth && Number(yearMonth.substring(5));
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
