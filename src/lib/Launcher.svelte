<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';

	import { writable, type Writable } from 'svelte/store';
	import PlayIcon from './icons/svg/boxicons/PlayIcon.svelte';
	import PauseIcon from './icons/svg/boxicons/PauseIcon.svelte';

	let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		$currentLauncherState = 1;
		outcomeMsg = await invoke('launch_interceptor', { sessionName });
		alert(outcomeMsg);
	}

	export const currentLauncherState: Writable<number> = writable(0);
</script>

<div>
	<div class="flex items-center">
		<button type="button" class="btn-icon btn-icon-sm" on:click={launch}>
			{#if $currentLauncherState == 0}
				<PlayIcon />
			{/if}
			{#if $currentLauncherState != 0}
				<PauseIcon />
			{/if}
		</button>
	</div>
</div>
