<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';

	let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		outcomeMsg = await invoke('launch_interceptor', { sessionName });
	}
</script>

<div>
	<input id="laucher-input" placeholder="Enter a name..." bind:value={sessionName} />
	<button on:click={launch}>Launch browser</button>
	<p>{outcomeMsg}</p>
</div>
