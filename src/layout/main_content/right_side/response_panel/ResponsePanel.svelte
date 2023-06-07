<script lang="ts">
	import Hdivider from '$lib/Hdivider.svelte';
	import ResponseBodyPanel from './ResponseBodyPanel.svelte';
	import ResponseHeaderPanel from './ResponseHeaderPanel.svelte';
	import ResponseToolbar from './ResponseToolbar.svelte';
</script>

<div class="flex flex-col w-1/2 gap-2">
	<ResponseToolbar />
	<!-- <Hdivider /> -->
	<ResponseHeaderPanel />
	<!-- <Hdivider /> -->
	<ResponseBodyPanel />
</div>
