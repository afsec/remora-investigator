<script lang="ts">
	import ChevronRightIcon from '$lib/icons/svg/monoicons/ChevronRightIcon.svelte';
	import ChevronLeftIcon from '$lib/icons/svg/monoicons/ChevronLeftIcon.svelte';
	import ChevronDoubleLeftIcon from '$lib/icons/svg/monoicons/ChevronDoubleLeftIcon.svelte';
	import ChevronDoubleRightIcon from '$lib/icons/svg/monoicons/ChevronDoubleRightIcon.svelte';
	import {
		historyPanelContent,
		HistoryPanelStates,
		type HistoryPanelStore
	} from '$stores/historyPanelContentStore';

	function getEventsLength(historyPanelStore: HistoryPanelStore): number {
		return historyPanelStore.state === HistoryPanelStates.RECEIVED_SUCCESS &&
			historyPanelStore.data !== null &&
			historyPanelStore.data.length > 0
			? historyPanelStore.data.length
			: 0;
	}

	function gotoNextPage() {
		console.log('gotoNextPage()');
	}

	function gotoPreviousPage() {
		console.log('gotoPreviousPage()');
	}

	function gotoFirstPage() {
		console.log('gotoFirstPage()');
	}

	function gotoLastPage() {
		console.log('gotoLastPage()');
	}
</script>

<div class="flex flex-col h-full gap-1 items-center w-32 min-w-32">
	<div class="flex flex-col items-center w-full">
		<span class="mt-2 font-bold font-mono">Events</span>
		<span class="font-mono">{getEventsLength($historyPanelContent)}</span>
		<hr class="w-full !border-t-2" />
	</div>
	<div>
		<span class="font-bold font-mono">Page</span>
	</div>
	<div class="flex flex-col items-center gap-2 h-full">
		<div class="flex items-center justify-between w-full px-3 font-mono">
			<span>1</span>
			<span>of</span>
			<span>?</span>
		</div>
		<div class="flex items-center justify-between w-full px-3">
			<ChevronLeftIcon on:onClick={() => gotoPreviousPage()} />
			<span>|</span>
			<ChevronRightIcon on:onClick={() => gotoNextPage()} />
		</div>
		<div class="flex items-center justify-between w-full px-3">
			<ChevronDoubleLeftIcon on:onClick={() => gotoFirstPage()} />
			<span>|</span>
			<ChevronDoubleRightIcon on:onClick={() => gotoLastPage()} />
		</div>
	</div>
</div>
