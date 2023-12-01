<script lang="ts">
	const generatePin = () => {
		if (!(Number.isInteger(length) && length >= 1 && length <= 99)) return (pin = '');
		let string = '';
		while (string.length < length) {
			const [randomValue] = crypto.getRandomValues(new Uint32Array(1));
			string += randomValue.toString(); // 0 ~ 4294967295 (2^32-1)
		}
		pin = string.substring(0, length);
	};

	let length = 4;
	let pin = '5260';
</script>

<p><code>Math.random()</code>을 사용하지 않습니다.</p>

<form>
	<fieldset>
		<legend>자릿수</legend>
		<input type="number" min="1" max="99" size="5" bind:value={length} on:change={generatePin} />
		<span>유효하지 않은 값입니다.</span>
	</fieldset>
	{#if pin}
		<fieldset>
			<legend>생성값</legend>
			<input
				type="text"
				value={pin}
				size={pin.length + 1}
				readonly
				on:click={(e) => e.currentTarget.select()}
			/>
			<button on:click={generatePin}>재생성</button>
		</fieldset>
	{/if}
</form>

<style>
	form > * {
		margin-top: 1rem;
	}
	input {
		font-family: monospace;
	}
	input[type='number']:valid + span {
		display: none;
	}
</style>
