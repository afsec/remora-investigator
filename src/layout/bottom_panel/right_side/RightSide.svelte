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
	class="flex grow justify-center items-center h-full bg-base-300 border-[1px] border-surface-500 dark:border-surface-500 rounded-md"
>
	<h6 class="h6">{$tabIndexNumberToName}</h6>
</div>
