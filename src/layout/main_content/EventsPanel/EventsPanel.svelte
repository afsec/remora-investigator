<script lang="ts">
	import RefreshIcon from '$lib/icons/svg/boxicons/RefreshIcon.svelte';
	import Table from './Table/Table.svelte';

	function refreshEvents(): void {
		console.log('[EVENTS PANEL]: refreshEvents()');
	}
</script>

<div class="flex h-1/2 flex-col gap-2 rounded-md justify-between overflow-hidden">
	<div
		class="flex h-8 p-2 items-center rounded-md justify-between bg-surface-100 dark:bg-surface-500"
	>
		<span class="text-xs"
			>Sites: <span class="font-bold"> 7</span> (Total events:
			<span class="font-bold">28</span>)</span
		>

		<RefreshIcon on:onClick={() => refreshEvents()} />
	</div>
	<Table />
</div>
