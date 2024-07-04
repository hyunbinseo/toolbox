<script lang="ts">
	import { generatePINString } from '@hyunbinseo/tools';

	let length = 6;
	let pins: string[] = [];
</script>

<p><code>Math.random()</code>을 사용하지 않습니다.</p>

<form
	on:submit|preventDefault={() => {
		pins.unshift(generatePINString(length));
		pins = pins;
	}}
>
	<fieldset>
		<legend>자릿수</legend>
		<input
			type="number"
			min="1"
			max="999"
			required
			bind:value={length}
			size={length.toString().length + 3}
		/>
		<button>생성</button>
	</fieldset>
	{#if pins.length}
		{@const [pin] = pins}
		<fieldset>
			<legend>생성값</legend>
			<input
				type="text"
				value={pin}
				size={pin.length + 1}
				readonly
				on:click={(e) => e.currentTarget.select()}
			/>
			<ol>
				{#each pins as pin}
					<li>{pin}</li>
				{/each}
			</ol>
		</fieldset>
	{/if}
</form>

<style>
	form > * {
		margin-top: 1rem;
	}
	input,
	ol {
		font-family: monospace;
	}
	ol {
		list-style-type: none;
		padding-left: 0;
	}
</style>
