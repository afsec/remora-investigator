<script lang="ts">
	import HistoryTabContent from './HistoryTabContent/Table/Table.svelte';
	import AlertsTabContent from './AlertsTabContent.svelte';
	import ImpossibleStateTabContent from './ImpossibleStateTabContent.svelte';
	import { currentActiveTab } from '$stores/tabs';
</script>

<!-- TODO: Try to use <svelte:component /> 	 -->
{#if $currentActiveTab === 0}
	<HistoryTabContent />
{:else if $currentActiveTab === 1}
	<AlertsTabContent />
{:else}
	<ImpossibleStateTabContent />
{/if}
