<script lang="ts">
	// import { invoke } from '@tauri-apps/api/tauri';

	const invoke = (str: string, obj: any): string => 'Some text from outside';
	let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		outcomeMsg = invoke('launch_interceptor', { sessionName });
	}
</script>

<div class="space-y-2">
	<input class="input" type="text" placeholder="SessionName" bind:value={sessionName} />
	<button type="button" class="btn variant-filled" on:click={launch}>Launch browser</button>
	<p>{outcomeMsg}</p>
</div>
