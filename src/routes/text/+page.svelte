<script lang="ts">
	let checkedToolIndex = 0;
	let radioButtonList: HTMLOListElement;
	let textarea: HTMLTextAreaElement;
	let trimText = false;
	let wrapText = true;
	let processed = false;

	// Leading and trailing spaces are handled by the trim option.
	// Whitespace(s) between the lines should be handled by the regex.
	const presets: Array<{ name: string; fn: (text: string) => string }> = [
		{
			name: '중복 빈 줄 제거',
			fn: (text) => text.replace(/(?: *\r?\n){3,}/g, '\n\n')
		},
		{
			name: '모든 빈 줄 제거',
			fn: (text) => text.replace(/(?: *\r?\n){2,}/g, '\n')
		},
		{
			name: '모든 줄표 제거 (-)',
			fn: (text) => text.replace(/-/g, '')
		},
		{
			name: '두 줄을 한 줄로 변경',
			fn: (text) =>
				text
					// Final new line may or may not exist
					.match(/^.*\r?\n.*(?:\r?\n)?$/gm)
					?.map((twoLines) => twoLines.replace(/ *\r?\n */, ': ').trim())
					.join('\n') || ''
		}
	];

	$: preset = presets[checkedToolIndex];

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
			checkedToolIndex = number - 1;
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
		await pause();
		const pasted = (e.target as HTMLTextAreaElement).value;
		textarea.value = preset.fn(trimText ? pasted.trim() : pasted);
		processed = true;
		await selectTextArea();
		if (!wrapText) textarea.scrollLeft = 0;
	};
</script>

<svelte:window on:keydown={handleKeyboardShortcut} />

<ol bind:this={radioButtonList}>
	{#each presets as { name }, index}
		<li>
			<label>
				<input type="radio" bind:group={checkedToolIndex} name="tool" value={index} />
				{name}
			</label>
		</li>
	{/each}
</ol>

<span style:visibility={processed ? 'visible' : 'hidden'}>변환 완료. 복사해서 사용하세요.</span>

<textarea
	bind:this={textarea}
	cols="80"
	rows="20"
	wrap={wrapText ? 'soft' : 'off'}
	on:keydown={blurTextarea}
	on:paste={pastedTextArea}
	on:input={() => (processed = false)}
	on:blur={() => (processed = false)}
	placeholder="텍스트를 붙여 넣으면 변환이 이뤄집니다."
/>

<ul>
	<li>
		<label>
			<input type="checkbox" bind:checked={wrapText} />
			입력란 폭에 맞게 줄 바꿈
		</label>
	</li>
	<li>
		<label>
			<input type="checkbox" bind:checked={trimText} />
			문자열 앞⋅뒤 공백 제거
		</label>
	</li>
</ul>

<style>
	span {
		background-color: yellow;
		color: black;
	}
	textarea {
		tab-size: 4;
		display: block;
		max-width: 100%;
	}
</style>
