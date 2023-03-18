<script lang="ts">
	let checkedToolValue: number;
	let radioButtonList: HTMLOListElement;
	let textarea: HTMLTextAreaElement;
	let trimText = true;
	let wrapText = true;
	let processed = false;

	const presets: Array<{ description: string; fn: (text: string) => string }> = [
		{
			description: 'Remove duplicate blank lines',
			fn: (text) => text.replaceAll(/(\n *){3,}/g, '\n\n')
		},
		{
			description: 'Remove all blank lines',
			fn: (text) => text.replaceAll(/(\n *){2,}/g, '\n')
		}
	];

	const pause = () => new Promise((resolve) => setTimeout(resolve));

	const selectTextArea = async () => {
		await pause();
		textarea.scrollTop = 0;
		textarea.select();
	};

	const handleKeyboardShortcut = async ({ key, keyCode }: KeyboardEvent) => {
		if (document.activeElement === textarea) return;
		if (keyCode === 65) {
			await selectTextArea();
		}
		if (/\d/.test(key)) {
			const number = Number(key);
			const radioButton = radioButtonList.querySelectorAll('input[type="radio"]')[number - 1];
			if (!radioButton) return;
			checkedToolValue = number - 1;
			await selectTextArea();
		}
	};

	const blurTextarea = async ({ key }: KeyboardEvent) => {
		if (key === 'Escape') {
			(document.activeElement as HTMLElement)?.blur();
			(radioButtonList.querySelector('input[type="radio"]:checked') as HTMLInputElement)?.focus();
		}
	};

	const pastedTextArea = async (e: Event) => {
		const tool = presets[checkedToolValue];
		if (!tool) return;
		await pause();
		const pasted = (e.target as HTMLTextAreaElement).value;
		textarea.value = tool.fn(trimText ? pasted.trim() : pasted);
		processed = true;
		await selectTextArea();
		if (!wrapText) textarea.scrollLeft = 0;
	};
</script>

<svelte:window on:keydown={handleKeyboardShortcut} />

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

<span style:visibility={processed ? 'visible' : 'hidden'}>Successfully processed text</span>

<textarea
	bind:this={textarea}
	cols="80"
	rows="20"
	wrap={wrapText ? 'soft' : 'off'}
	on:keydown={blurTextarea}
	on:paste={pastedTextArea}
	on:input={() => (processed = false)}
	on:blur={() => (processed = false)}
	disabled={checkedToolValue === undefined}
	placeholder="Select a feature and paste the text in this box."
/>

<label>
	<input type="checkbox" bind:checked={trimText} />
	Trim text
</label>

<label>
	<input type="checkbox" bind:checked={wrapText} />
	Wrap text
</label>

<style>
	ol {
		padding-inline-start: 20px;
	}
	span {
		background-color: yellow;
		color: black;
	}
	textarea {
		display: block;
		max-width: 100%;
	}
</style>
