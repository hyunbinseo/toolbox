<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.data.title}</h1>
<slot />
