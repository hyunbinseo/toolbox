<script lang="ts">
	let checkedToolIndex = 0;
	let textarea: HTMLTextAreaElement;
	let textareaIsFocused = false;
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
			name: '모든 줄 앞⋅뒤 공백 제거',
			fn: (text) => text.replace(/(^ +)/gm, '').replace(/( +$)/gm, '')
		},
		{
			name: '모든 붙임표 제거 (-)',
			example: '010-1234 → 0101234',
			fn: (text) => text.replace(/-/g, '')
		},
		{
			name: '두 줄을 한 줄로 합치기',
			example: '순위↵1등 → 순위: 1등',
			fn: (text) =>
				text
					// Final new line may or may not exist
					.match(/^.*\r?\n.*(?:\r?\n)?$/gm)
					?.map((twoLines) => twoLines.replace(/ *\r?\n */, ': ').trim())
					.join('\n') || ''
		},
		{
			name: '안전한 파일명으로 변환',
			fn: (text) => text.replace(/[<>:"/\\|?*]/g, '-').replace(/-{2,}/g, '-')
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
		on:focus={() => (textareaIsFocused = true)}
		on:blur={() => (textareaIsFocused = false)}
		on:keydown={(e) => {
			if (e.ctrlKey && e.keyCode === 13) processText();
		}}
		rows="15"
		wrap={wrapText ? 'soft' : 'off'}
		placeholder="변환할 텍스트를 입력하세요."
	/>
	<div class="control">
		<button disabled={!text}>변환</button>
		{#if textareaIsFocused}
			<span class="shortcut">단축키: <kbd>Ctrl</kbd> + <kbd>Enter</kbd></span>
		{/if}
	</div>
	<fieldset>
		<legend>설정</legend>
		<label>
			<input type="checkbox" bind:checked={wrapText} />
			입력란 폭에 맞게 줄 바꿈
		</label>
		<label>
			<input type="checkbox" bind:checked={trimText} />
			문자열 맨 앞⋅뒤 공백 제거
		</label>
	</fieldset>
</form>

<style>
	form > * {
		margin-top: 1rem;
	}
	label,
	textarea {
		display: block;
	}
	textarea {
		width: 100%;
		padding: 1rem;
	}
	.control {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.shortcut {
		font-size: 0.875rem;
	}
</style>
