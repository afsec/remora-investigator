<script lang="ts">
	import Loading from '$lib/Loading.svelte';
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
	// import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	// import type { EventRequest } from '$entities/EventRequestEntity';

	// const sourceEvents: TableSource = {
	// 	// A list of heading labels.
	// 	head: ['Id', 'Protocol'],
	// 	// The data visibly shown in your table body UI.
	// 	body: tableMapperValues($historyPanelContent ?? ([] as EventRequest[]), [
	// 		'request_id',
	// 		'http_protocol',
	// 		'weight'
	// 	]),
	// 	// Optional: The data returned when interactive is enabled and a row is clicked.
	// 	meta: tableMapperValues($historyPanelContent ?? ([] as EventRequest[]), [
	// 		'request_id',
	// 		'http_protocol',
	// 		'symbol',
	// 		'weight'
	// 	]),
	// 	// Optional: A list of footer labels.
	// 	foot: ['Total', '', '<code class="code">5</code>']
	// };
</script>

<div class="table-container !h-full">
	<table class="table-compact table-hover">
		<thead>
			<tr class="font-mono text-xs">
				<th>Id</th>
				<th>Protocol</th>
				<th>Req.timestamp</th>
				<th>Method</th>
				<th>URL</th>
				<th>Status</th>
				<th>Format</th>
				<th>RTT</th>
				<th>Resp. Body</th>
				<th>Notes</th>
			</tr>
		</thead>
		<tbody>
			{#if $historyPanelContent.state === HistoryPanelStates.RECEIVED_SUCCESS}
				{#if $historyPanelContent.data !== null && $historyPanelContent.data.length > 0}
					{#each $historyPanelContent.data as event, index}
						<tr>
							<!-- <td class="text-sm">{event.request_id}</td> -->
							<td class="text-sm">{index + 1}</td>
							<td class="text-sm">{event.http_protocol}</td>
							<td class="text-sm">{event.request_time}</td>
							<td class="text-sm">{event.method}</td>
							<td class="text-sm">{event.response_url.substring(0, 50)}</td>
							<td class="text-sm">{event.status_code}</td>
							<td class="text-sm">{event.mime_type}</td>
							<td class="text-sm">{event.rtt}</td>
							<td class="text-sm">?</td>
							<td class="font-bold text-sm">X</td>
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
