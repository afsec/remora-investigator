<script lang="ts">
	import { currentActiveTab } from '../Tabs';
	import HistoryTabContent from '../HistoryTabContent.svelte';
	import AlertsTabContent from '../AlertsTabContent.svelte';
	import ImpossibleStateTabContent from '../ImpossibleStateTabContent.svelte';
	import Paginator from './Paginator/Paginator.svelte';
</script>

<div class="flex grow h-full gap-x-2">
	<Paginator />
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
</div>
