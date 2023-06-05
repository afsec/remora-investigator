<script lang="ts">
	import Vdivider from '$lib/Vdivider.svelte';
	import RequestPanel from './request_panel/RequestPanel.svelte';
	import ResponsePanel from './response_panel/ResponsePanel.svelte';
</script>

<div class="flex grow gap-2">
	<RequestPanel />
	<!-- <Vdivider /> -->
	<ResponsePanel />
</div>
