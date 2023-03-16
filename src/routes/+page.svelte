<script lang="ts">
	let radioButtonList: HTMLOListElement;
	let textarea: HTMLTextAreaElement;
	let checkedToolValue: number;

	const presets: Array<{ description: string; fn: (text: string) => string }> = [
		{
			description: 'Trim white spaces and duplicate new-lines',
			fn: (text) => text.replaceAll(/^\s+|\s+$/g, '').replaceAll(/\n{3,}/g, '\n\n')
		}
	];

	const selectRadio = async ({ key }: KeyboardEvent) => {
		if (!/\d/.test(key)) return;
		const number = Number(key);
		const radioButton = radioButtonList.querySelectorAll('input[type="radio"]')[number - 1];
		if (!radioButton) return;
		checkedToolValue = number - 1;
		setTimeout(() => textarea.focus());
	};

	const blurTextarea = async (e: KeyboardEvent) => {
		if (e.key === 'Escape') (document.activeElement as HTMLElement)?.blur();
	};

	const pastedTextArea = async (e: Event) => {
		const tool = presets[checkedToolValue];
		if (!tool) return;
		await new Promise((resolve) => setTimeout(resolve));
		const pasted = (e.target as HTMLTextAreaElement).value;
		textarea.value = tool.fn(pasted);
		textarea.select();
	};
</script>

<svelte:window on:keydown={selectRadio} />

<ol bind:this={radioButtonList}>
	{#each presets as { description }, index}
		<li>
			<label>
				<input type="radio" bind:group={checkedToolValue} name="tool" value={index} />
				{description}
			</label>
		</li>
	{/each}
</ol>

<textarea
	bind:this={textarea}
	cols="80"
	rows="20"
	on:paste={pastedTextArea}
	on:keydown={blurTextarea}
	disabled={checkedToolValue === undefined}
/>

<style>
	ol {
		padding-inline-start: 20px;
	}
	textarea {
		display: block;
	}
</style>
