<script lang="ts">
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
</script>

<tbody class="font-mono">
	{#if $historyPanelContent.state === HistoryPanelStates.RECEIVED_SUCCESS && $historyPanelContent.data !== null && $historyPanelContent.data.length > 0}
		{#each $historyPanelContent.data as event, index}
			<tr>
				<td class="text-center text-xs">{index + 1}</td>
				<td class="text-center text-xs">{event.http_protocol}</td>
				<td class="text-center text-[10px]">{event.request_time}</td>
				<td class="text-center text-xs">{event.method}</td>
				<td class="text-[10px]">{event.response_url.substring(0, 50)}</td>
				<td class="text-center text-xs">{event.status_code}</td>
				<td class="text-center text-[10px]">{event.mime_type}</td>
				<td class="text-center text-[10px]">{event.rtt}</td>
				<td class="text-center text-xs">?</td>
				<td class="text-center font-bold text-xs">X</td>
			</tr>
		{/each}
	{/if}
</tbody>
