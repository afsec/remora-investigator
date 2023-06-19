<script lang="ts">
	import Loading from '$lib/Loading.svelte';
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
	import TableBody from './TableBody/TableBody.svelte';
	import TableHead from './TableHead/TableHead.svelte';
</script>

{#if $historyPanelContent.state === HistoryPanelStates.LOADING}
	<div class="flex items-center justify-center">
		<Loading />
	</div>
{:else}
	<div class="table-container !h-full pt-3">
		<table class="table-compact table-hover">
			<TableHead />
			<TableBody />
		</table>
	</div>
{/if}
