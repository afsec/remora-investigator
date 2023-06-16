<script lang="ts">
	import Loading from '$lib/Loading.svelte';
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
</script>

<div class="table-container !h-full">
	<table class="table-compact table-hover">
		<thead>
			<tr class="font-mono text-xs">
				<th class="w-5">Id</th>
				<th class="w-24">Protocol</th>
				<th class="w-26">Req.timestamp</th>
				<th class="w-32">Method</th>
				<th class="w-64">URL</th>
				<th class="w-10">Status</th>
				<th class="w-32">Format</th>
				<th class="w-12">RTT</th>
				<th class="w-10">Body</th>
				<th class="w-10">Notes</th>
			</tr>
		</thead>
		<tbody class="font-mono">
			{#if $historyPanelContent.state === HistoryPanelStates.RECEIVED_SUCCESS}
				{#if $historyPanelContent.data !== null && $historyPanelContent.data.length > 0}
					{#each $historyPanelContent.data as event, index}
						<tr class="h-2">
							<!-- <td class="text-sm">{event.request_id}</td> -->
							<td class="text-center text-sm">{index + 1}</td>
							<td class="text-center text-xs">{event.http_protocol}</td>
							<td class="text-center text-[10px]">{event.request_time}</td>
							<td class="text-center text-xs">{event.method}</td>
							<td class="text-[10px]">{event.response_url.substring(0, 50)}</td>
							<td class="text-center text-xs">{event.status_code}</td>
							<td class="text-center text-[10px]">{event.mime_type}</td>
							<td class="text-center text-[10px]">{event.rtt}</td>
							<td class="text-center text-sm">?</td>
							<td class="text-center font-bold text-sm">X</td>
						</tr>
					{/each}
				{/if}
			{/if}
			{#if $historyPanelContent.state === HistoryPanelStates.LOADING}
				<Loading />
			{/if}
		</tbody>
		<!-- <tfoot>\
                <tr>
                    <th colspan="3">Calculated Total Weight</th>
                    <td>{totalWeight}</td>
                </tr>
		    </tfoot> -->
	</table>
</div>
