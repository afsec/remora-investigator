<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import { message } from '@tauri-apps/api/dialog';

	import { writable, type Writable } from 'svelte/store';
	import PlayIcon from './icons/svg/boxicons/PlayIcon.svelte';
	import PauseIcon from './icons/svg/boxicons/PauseIcon.svelte';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { OutcomeResponse } from '$entities/OutcomeResponseEntity';
	import { currentLauncherState } from '$stores/launcherStore';

	let sessionName = '';

	async function launch() {
		currentLauncherState.set(1);

		const outcomeStr: string = await invoke('launch_interceptor', { sessionName });

		let outcomeObj: OutcomeResponse = JSON.parse(outcomeStr);

		if (outcomeObj.success && outcomeObj.data !== null) {
			toastStore.trigger({ message: `${outcomeObj.data}` });
		}
	}
</script>

<div>
	<div class="flex items-center">
		{#if $currentLauncherState == 0}
			<PlayIcon on:onClick={launch} class="btn-icon btn-icon-sm" />
		{/if}
		{#if $currentLauncherState != 0}
			<PauseIcon class="btn-icon btn-icon-sm" on:onClick={() => currentLauncherState.set(0)} />
		{/if}
	</div>
</div>
