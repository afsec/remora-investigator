<script lang="ts">
	import { derived } from 'svelte/store';
	import { currentActiveTabLocalStorage } from '../Tabs';

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
</script>

<div
	class="flex grow h-full bg-base-300 border-[1px] border-surface-500 dark:border-surface-500 rounded-md gap-x-2"
>
	<div
		class="flex h-full justify-center items-center w-1/5 border-[1px] border-surface-500 dark:border-surface-500 rounded-md ml-2"
	>
		<h6 class="h6">{$tabIndexNumberToName}</h6>
	</div>
	<div
		class="flex h-full grow justify-center items-center border-[1px] border-surface-500 dark:border-surface-500 rounded-md mr-2"
	>
		<h6 class="h6">{$tabIndexNumberToName}</h6>
	</div>
</div>
