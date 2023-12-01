<script lang="ts">
	export let data;
</script>

<ol>
	<li><a href="https://jamoya.one/" target="_blank">자소 분리 해결</a></li>
	{#each data.tools as { path, title }}
		<li><a href={path}>{title}</a></li>
	{/each}
</ol>
