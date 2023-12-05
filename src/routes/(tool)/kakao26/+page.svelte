<script lang="ts">
	const cumulativeSum = (
		(sum: number) => (value: number) =>
			(sum += value)
	)(0);

	const balances = new Array(26).fill(0).map((_, index) => {
		const n = index + 1;
		return (n * (n + 1)) / 2;
	});

	const cumulated = balances.map(cumulativeSum);
</script>

<a href="https://www.kakaobank.com/bank-story/195" target="_blank">
	1,000원 짜리 26주적금으로 337만 원 만드는 법
</a>

<table>
	<thead>
		<tr>
			<th>주차</th>
			<th>계좌잔고<br />입금필요</th>
			<th>총액</th>
		</tr>
	</thead>
	<tbody>
		{#each cumulated as c, index}
			<tr>
				<td>{index + 1}</td>
				<td>{balances[index]}</td>
				<td>{c}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		font-family: monospace;
		border-collapse: collapse;
		margin-top: 1.5rem;
	}
	th,
	td {
		text-align: right;
		border: 1px solid;
		padding: 0.25rem 0.5rem;
	}
	thead > tr,
	tbody > tr:nth-child(2n) {
		background-color: lightgray;
	}
</style>
