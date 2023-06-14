<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import { message } from '@tauri-apps/api/dialog';

	import { writable, type Writable } from 'svelte/store';
	import PlayIcon from './icons/svg/boxicons/PlayIcon.svelte';
	import PauseIcon from './icons/svg/boxicons/PauseIcon.svelte';

	let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		currentLauncherState.set(1);
		outcomeMsg = await invoke('launch_interceptor', { sessionName });
		await message(outcomeMsg);
	}

	export const currentLauncherState: Writable<number> = writable(0);
</script>

<div>
	<div class="flex items-center">
		{#if $currentLauncherState == 0}
			<PlayIcon on:onClick={launch} />
		{/if}
		{#if $currentLauncherState != 0}
			<PauseIcon on:onClick={() => currentLauncherState.set(0)} />
		{/if}
	</div>
</div>
