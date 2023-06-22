<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import RefreshIcon from '$lib/icons/svg/boxicons/RefreshIcon.svelte';
	import { get } from 'svelte/store';
	import { Buffer } from 'buffer';
	import { message } from '@tauri-apps/api/dialog';
	import { historyPanelContent, HistoryPanelStates } from '$stores/historyPanelContentStore';
	import { currentLauncherState } from '$stores/launcherStore';

	import type { OutcomeResponse } from '$entities/OutcomeResponseEntity';
	import type { EventRequest } from '$entities/EventRequestEntity';
	import { differenceInMilliseconds } from 'date-fns';

	enum HttpVersion {
		HTTP_10,
		HTTP_11,
		HTTP_2,
		HTTP_3,
		HTTP_UNKNOW
	}

	class HttpProto {
		payload: string;
		version: HttpVersion;
		constructor(payload: string) {
			this.payload = payload;
			this.version = this.fromPayload();
		}
		private fromPayload(): HttpVersion {
			switch (this.payload) {
				case 'http/1.0':
					return HttpVersion.HTTP_10;

				case 'http/1.1':
					return HttpVersion.HTTP_11;

				case 'h2':
					return HttpVersion.HTTP_2;

				case 'h3':
					return HttpVersion.HTTP_3;

				default:
					return HttpVersion.HTTP_UNKNOW;
			}
		}
		toString(): string {
			switch (this.version) {
				case HttpVersion.HTTP_10:
					return 'HTTP/1.0';

				case HttpVersion.HTTP_11:
					return 'HTTP/1.1';

				case HttpVersion.HTTP_2:
					return 'HTTP/2';

				case HttpVersion.HTTP_3:
					return 'HTTP/3';

				case HttpVersion.HTTP_UNKNOW:
					return `${this.payload}`;
			}
		}
	}

	function calculateRTT(rfc_date1: string, rfc_date2: string): string {
		const requestTime = new Date(rfc_date1);
		const responseTime = new Date(rfc_date2);
		const millis = Math.abs(differenceInMilliseconds(responseTime, requestTime));
		const outcome = formatMs(millis);
		return outcome;
	}

	function formatMs(millis: number): string {
		if (millis > 60000) {
			return '> 1 min';
		}
		if (millis > 999) {
			const result = millis / 1000;
			return `${result} s`;
		} else {
			return `${millis} ms`;
		}
	}
	async function launch() {
		historyPanelContent.set({
			data: null,
			state: HistoryPanelStates.LOADING,
			error: null
		});

		const outcomeStr: string = await invoke('list_events', {});
		let outcomeObj: OutcomeResponse = JSON.parse(outcomeStr);

		if (outcomeObj.success && outcomeObj.data !== null) {
			const decodedData: string = Buffer.from(outcomeObj.data, 'base64').toString('utf8');
			const eventsFromBackend: EventRequest[] = JSON.parse(decodedData);

			const events = eventsFromBackend.map((item) => {
				item.http_protocol = new HttpProto(item.http_protocol).toString();
				item.rtt = calculateRTT(item.request_time, item.response_time);
				return item;
			});

			historyPanelContent.set({
				data: events,
				state: HistoryPanelStates.RECEIVED_SUCCESS,
				error: null
			});
		} else {
			await message(outcomeObj.error ?? 'UNKNOWN ERROR');
		}
	}
</script>

<div>
	<div class="flex items-center">
		{#if $currentLauncherState !== 0}
			<RefreshIcon class="btn-icon btn-icon-sm" on:onClick={launch} />
		{:else}
			<button type="button" class="btn-icon btn-icon-sm" />
		{/if}
	</div>
</div>
