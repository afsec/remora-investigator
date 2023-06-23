<script lang="ts">
	import type { ComponentType } from 'svelte';

	import HistoryTabContent from './HistoryTabContent/Table/Table.svelte';
	import AlertsTabContent from './AlertsTabContent.svelte';
	import ImpossibleStateTabContent from './ImpossibleStateTabContent.svelte';
	import { currentActiveTab } from '$stores/tabs';

	function renderComponentFromActiveTabIndex(): ComponentType {
		switch ($currentActiveTab) {
			case 0:
				return HistoryTabContent;
			case 1:
				return AlertsTabContent;
			default:
				return ImpossibleStateTabContent;
		}
	}
</script>

<svelte:component this={renderComponentFromActiveTabIndex()} />
