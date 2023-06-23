<script lang="ts">
	import Loading from '$lib/Loading.svelte';
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
	import TableBody from './TableBody/TableBody.svelte';
	import TableHead from './TableHead/TableHead.svelte';
</script>

{#if $historyPanelContent.state === HistoryPanelStates.LOADING}
	<div class="flex h-full w-full items-center justify-center">
		<Loading />
	</div>
{:else}
	<table class="table-wrapper-events table-hover pb-2">
		<TableHead />
		<TableBody />
	</table>
{/if}
