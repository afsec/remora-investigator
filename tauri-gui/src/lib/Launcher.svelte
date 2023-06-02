<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';

	let name = '';
	let outcomeMsg = '';

	async function launch() {
		outcomeMsg = await invoke('launch_interceptor', { name });
	}
</script>

<div>
	<input id="laucher-input" placeholder="Enter a name..." bind:value={name} />
	<button on:click={launch}>Launch browser</button>
	<p>{outcomeMsg}</p>
</div>
