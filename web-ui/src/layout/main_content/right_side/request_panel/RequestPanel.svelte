<script lang="ts">
	import Hdivider from '$lib/Hdivider.svelte';
	import RequestBodyPanel from './RequestBodyPanel.svelte';
	import RequestHeaderPanel from './RequestHeaderPanel.svelte';
	import RequestToolbar from './RequestToolbar.svelte';
</script>

<div class="flex flex-col w-1/2 gap-2">
	<RequestToolbar />
	<!-- <Hdivider /> -->
	<RequestHeaderPanel />
	<!-- <Hdivider /> -->
	<RequestBodyPanel />
</div>
