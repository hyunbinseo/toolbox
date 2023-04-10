<script lang="ts">
	let checkedToolIndex = 0;
	let radioButtonList: HTMLUListElement;
	let textarea: HTMLTextAreaElement;
	let text = '';
	let trimText = false;
	let wrapText = true;

	// Leading and trailing spaces are handled by the trim option.
	// Whitespace(s) between the lines should be handled by the regex.
	const presets: Array<{ name: string; example?: string; fn: (text: string) => string }> = [
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
			example: '1-2-3-4 → 1234',
			fn: (text) => text.replace(/-/g, '')
		},
		{
			name: '두 줄을 한 줄로 변경',
			example: 'a↵b → a: b',
			fn: (text) =>
				text
					// Final new line may or may not exist
					.match(/^.*\r?\n.*(?:\r?\n)?$/gm)
					?.map((twoLines) => twoLines.replace(/ *\r?\n */, ': ').trim())
					.join('\n') || ''
		}
	];

	$: preset = presets[checkedToolIndex];

	const processText = async () => {
		if (!text) return;
		text = preset.fn(trimText ? text.trim() : text);
		textarea.scrollTop = 0;
		if (!wrapText) textarea.scrollLeft = 0;
		alert('변환이 완료되었습니다.');
		await new Promise((resolve) => setTimeout(resolve));
		textarea.select();
	};
</script>

<form on:submit|preventDefault={processText}>
	<fieldset>
		<legend>기능</legend>
		{#each presets as { name, example }, index}
			<label>
				<input type="radio" bind:group={checkedToolIndex} name="tool" value={index} />
				<span>
					{(checkedToolIndex === index ? example : name) || name}
				</span>
			</label>
		{/each}
	</fieldset>
	<textarea
		bind:this={textarea}
		bind:value={text}
		on:keydown={(e) => {
			if (e.ctrlKey && e.keyCode === 13) processText();
		}}
		rows="20"
		wrap={wrapText ? 'soft' : 'off'}
		placeholder="텍스트를 입력하고 변환을 누르세요. (Ctrl + Enter)"
	/>
	<button disabled={!text}>변환</button>
	<fieldset>
		<legend>설정</legend>
		<label>
			<input type="checkbox" bind:checked={wrapText} />
			입력란 폭에 맞게 줄 바꿈
		</label>
		<label>
			<input type="checkbox" bind:checked={trimText} />
			문자열 앞⋅뒤의 공백 제거
		</label>
	</fieldset>
</form>

<style>
	form,
	fieldset {
		display: flex;
		flex-direction: column;
	}
	form {
		row-gap: 1rem;
	}
	textarea,
	button {
		padding: 0.75rem;
	}
	textarea {
		tab-size: 4;
		display: block;
		max-width: 100%;
	}
</style>
