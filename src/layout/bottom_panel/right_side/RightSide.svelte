<script lang="ts">
	import { derived, type Readable } from 'svelte/store';
	import { currentActiveTab } from '../Tabs';
	import ChevronRightIcon from '$lib/icons/svg/monoicons/ChevronRightIcon.svelte';
	import ChevronLeftIcon from '$lib/icons/svg/monoicons/ChevronLeftIcon.svelte';
	import ChevronDoubleLeftIcon from '$lib/icons/svg/monoicons/ChevronDoubleLeftIcon.svelte';
	import ChevronDoubleRightIcon from '$lib/icons/svg/monoicons/ChevronDoubleRightIcon.svelte';
	import HistoryTabContent from '../HistoryTabContent.svelte';
	import NotesTabContent from '../NotesTabContent.svelte';
	import { historyPanelContent } from '$stores/historyPanelContentStore';
	import NotesPanel from '$layout/main_content/left_side/NotesPanel/NotesPanel.svelte';
	import AlertsTabContent from '../AlertsTabContent.svelte';
	import LogBookTabContent from '../LogBookTabContent.svelte';
	import ImpossibleStateTabContent from '../ImpossibleStateTabContent.svelte';

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

<div class="flex grow h-full gap-x-2">
	<div
		class="flex flex-col h-full gap-1 items-center w-1/5 border-2 border-surface-500 dark:border-surface-500 rounded-md"
	>
		<div class="flex flex-col items-center w-full">
			<span class="mt-2 font-bold font-mono">Events</span>
			<span class="font-mono">43</span>
			<hr class="w-full !border-t-2" />
		</div>
		<div>
			<span class="font-bold font-mono">Page</span>
		</div>
		<div class="flex flex-col items-center gap-2 h-full">
			<div class="flex items-center justify-between w-full px-3 font-mono">
				<span>2</span>
				<span>of</span>
				<span>3</span>
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
	<div
		class="flex h-full grow justify-center items-center border-2 border-surface-500 dark:border-surface-500 rounded-md mr-2"
	>
		<!-- TODO: Try to use <svelte:component /> 	 -->
		{#if $currentActiveTab === 0}
			<HistoryTabContent />
		{:else if $currentActiveTab === 1}
			<NotesTabContent />
		{:else if $currentActiveTab === 2}
			<AlertsTabContent />
		{:else if $currentActiveTab === 3}
			<LogBookTabContent />
		{:else}
			<ImpossibleStateTabContent />
		{/if}
	</div>
</div>
