<script lang="ts">
	import Loading from '$lib/Loading.svelte';
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
	import Paginator from '../Paginator/Paginator.svelte';
	import TableBody from './TableBody/TableBody.svelte';
	import TableHead from './TableHead/TableHead.svelte';
</script>

{#if $historyPanelContent.state === HistoryPanelStates.LOADING}
	<div class="flex w-full items-center justify-center">
		<Loading />
	</div>
{:else}
	<div class="flex">
		<Paginator />
		<div class="table-wrapper">
			<table class="table-hover">
				<TableHead />
				<TableBody />
			</table>
		</div>
	</div>
{/if}
