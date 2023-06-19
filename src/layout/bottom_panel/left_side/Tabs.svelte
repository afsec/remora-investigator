<script lang="ts">
	import HistoryTabContent from '../right_side/HistoryTabContent/Table/Table.svelte';
	import AlertsTabContent from '../AlertsTabContent.svelte';
	import ImpossibleStateTabContent from '../ImpossibleStateTabContent.svelte';
	import { currentActiveTab } from '$stores/tabs';
</script>

<div class="flex h-full grow justify-center items-center mr-2">
	<!-- TODO: Try to use <svelte:component /> 	 -->
	{#if $currentActiveTab === 0}
		<HistoryTabContent />
	{:else if $currentActiveTab === 1}
		<AlertsTabContent />
	{:else}
		<ImpossibleStateTabContent />
	{/if}
</div>
