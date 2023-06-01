<script lang="ts">
	import MainContent from '$layout/main_content/MainContent.svelte';
</script>

<div class="flex flex-col h-screen">
	<!-- MAIN CONTENT - BEGIN -->
	<MainContent />
	<!-- MAIN CONTENT - END -->
	<!-- DIVIDER BEGIN -->
	<div class="flex h-1 bg-base-100" />
	<!-- DIVIDER END -->
	<!-- BOTTOM PANEL - BEGIN -->
	<BottomPanel />
	<!-- BOTTOM PANEL - END -->
</div>
