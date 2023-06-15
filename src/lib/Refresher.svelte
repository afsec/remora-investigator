<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import RefreshIcon from '$lib/icons/svg/boxicons/RefreshIcon.svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import { Buffer } from 'buffer';
	import { message } from '@tauri-apps/api/dialog';
	import { historyPanelContent } from '$stores/historyPanelContentStore';
	import type { OutcomeResponse } from '$entities/OutcomeResponseEntity';
	import type { EventRequest } from '$entities/EventRequestEntity';

	async function launch() {
		const outcomeStr: string = await invoke('list_events', {});
		let outcomeObj: OutcomeResponse = JSON.parse(outcomeStr);

		if (outcomeObj.success && outcomeObj.data !== null) {
			const decodedData: string = Buffer.from(outcomeObj.data, 'base64').toString('utf8');
			const events: EventRequest[] = JSON.parse(decodedData);
			historyPanelContent.set(events);
		} else {
			await message(outcomeObj.error ?? 'NO ERRORS');
		}
		console.log(get(historyPanelContent));
	}
</script>

<div>
	<div class="flex items-center">
		<button type="button" class="btn-icon btn-icon-sm" on:click={launch}>
			<RefreshIcon />
		</button>
	</div>
</div>
