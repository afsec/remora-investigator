<script lang="ts">
	import { derived } from 'svelte/store';
	import { currentActiveTabLocalStorage } from '../Tabs';
	import ChevronRightIcon from '$lib/icons/svg/monoicons/ChevronRightIcon.svelte';
	import ChevronLeftIcon from '$lib/icons/svg/monoicons/ChevronLeftIcon.svelte';
	import ChevronDoubleLeftIcon from '$lib/icons/svg/monoicons/ChevronDoubleLeftIcon.svelte';
	import ChevronDoubleRightIcon from '$lib/icons/svg/monoicons/ChevronDoubleRightIcon.svelte';

	const tabIndexNumberToName = derived(currentActiveTabLocalStorage, ($currentTabIndex) => {
		switch ($currentTabIndex) {
			case 0:
				return 'History';

			case 1:
				return 'Notes';

			case 2:
				return 'Alerts';

			case 3:
				return 'Logbook';

			default:
				return 'History';
		}
	});

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
		<h6 class="h6 font-mono">{$tabIndexNumberToName}</h6>
	</div>
</div>
