<script lang="ts">
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
</script>

<tbody class="font-mono h-full w-full">
	{#if $historyPanelContent.state === HistoryPanelStates.RECEIVED_SUCCESS && $historyPanelContent.data !== null && $historyPanelContent.data.length > 0}
		{#each $historyPanelContent.data as event, index}
			<tr>
				<td class="w-[20%] text-center text-xs">{index + 1}</td>
				<td class="w-[80%] text-start text-xs">{event.url.trim()}</td>
			</tr>
		{/each}
	{/if}
</tbody>
