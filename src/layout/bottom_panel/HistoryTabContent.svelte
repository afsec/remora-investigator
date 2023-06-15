<script lang="ts">
	import Loading from '$lib/Loading.svelte';
	import { historyPanelContent } from '$stores/historyPanelContentStore';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { EventRequest } from '$entities/EventRequestEntity';

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

{#if $historyPanelContent !== null}
	<!-- <Table source={sourceEvents} /> -->

	<div class="table-container !h-full">
		<table class="table table-hover">
			<thead>
				<tr>
					<th class="text-sm">Id</th>
					<th class="text-sm">Protocol</th>
					<th class="text-sm">Req.timestamp</th>
					<th class="text-sm">Method</th>
					<th class="text-sm">URL</th>
					<th class="text-sm">Status</th>
					<th class="text-sm">Format</th>
					<th class="text-sm">RTT</th>
					<th class="text-sm">Resp. Body</th>
					<th class="text-sm">Notes</th>
				</tr>
			</thead>
			<tbody>
				{#each $historyPanelContent as event, index}
					<tr>
						<td class="text-sm">{event.request_id}</td>
						<td class="text-sm">{event.http_protocol}</td>
						<td class="text-sm">{event.request_time}</td>
						<td class="text-sm">{event.method}</td>
						<td class="text-sm">{event.response_url}</td>
						<td class="text-sm">{event.status_code}</td>
						<td class="text-sm">{event.mime_type}</td>
						<td class="text-sm">{event.response_time}</td>
						<td class="text-sm">?</td>
						<td class="font-bold text-sm">X</td>
					</tr>
				{/each}
			</tbody>
			<!-- <tfoot>
                <tr>
                    <th colspan="3">Calculated Total Weight</th>
                    <td>{totalWeight}</td>
                </tr>
		    </tfoot> -->
		</table>
	</div>
{:else}
	<Loading />
{/if}
