<script lang="ts">
	import MainContent from '$layout/main_content/MainContent.svelte';
	import BottomPanel from '$layout/bottom_panel/BottomPanel.svelte';
	import Hdivider from '$lib/Hdivider.svelte';
</script>

<div class="flex flex-col h-screen p-2 gap-2">
	<MainContent />
	<!-- <Hdivider /> -->
	<BottomPanel />
</div>
