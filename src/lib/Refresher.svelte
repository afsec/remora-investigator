<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import RefreshIcon from '$lib/icons/svg/boxicons/RefreshIcon.svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import { Buffer } from 'buffer';

	export const historyPanelContent: Writable<Event[]> = writable([]);

	async function launch() {
		const outcomeStr: string = await invoke('list_events', {});
		let outcomeObj: Outcome = JSON.parse(outcomeStr);

		if (outcomeObj.success && outcomeObj.data !== null) {
			const decodedData: string = Buffer.from(outcomeObj.data, 'base64').toString('utf8');
			const events: Event[] = JSON.parse(decodedData);
			historyPanelContent.set(events);
		} else {
			alert(outcomeObj.error);
		}
		console.log(get(historyPanelContent));
	}
	interface Outcome {
		success: boolean;
		data: string | null;
		error: string | null;
	}
	interface Event {
		request_id: string;
		request_time: string;
		method: string;
		url: string;
		http_protocol: string;
		response_time: string;
		status_code: number;
		response_url: string;
		mime_type: string;
	}
</script>

<div>
	<div class="flex items-center">
		<button type="button" class="btn-icon btn-icon-sm" on:click={launch}>
			<RefreshIcon />
		</button>
	</div>
</div>
