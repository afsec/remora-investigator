<script lang="ts">
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
</script>

<tbody class="font-mono h-48">
	{#if $historyPanelContent.state === HistoryPanelStates.RECEIVED_SUCCESS && $historyPanelContent.data !== null && $historyPanelContent.data.length > 0}
		{#each $historyPanelContent.data as event, index}
			<tr>
				<td class="w-[5%] text-center text-xs">{index + 1}</td>
				<td class="w-[5%] text-center text-xs">{event.http_protocol}</td>
				<td class="w-[16%] text-center text-[10px]">{event.request_time}</td>
				<td class="w-[5%] text-center text-xs">{event.method}</td>
				<td class="w-[20%] text-left text-[10px]">{event.response_url.substring(0, 50)}</td>
				<td class="w-[5%] text-center text-xs">{event.status_code}</td>
				<td class="w-[8%] text-center text-[10px]">{event.mime_type}</td>
				<td class="w-[5%] text-center text-[10px]">{event.rtt}</td>
				<td class="w-[5%] text-center text-xs">111.95 Kib</td>
				<td class="w-[5%] text-center font-bold text-xs">X</td>
			</tr>
		{/each}
	{/if}
</tbody>
