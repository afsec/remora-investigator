<script lang="ts">
	// import { invoke } from '@tauri-apps/api/tauri';

	const invoke = (str: string, obj: any): string => 'Some text from outside';
	let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		outcomeMsg = invoke('launch_interceptor', { sessionName });
	}
</script>

<div class="flex items-center space-y-2">
	<button type="button" class="btn h-5 w-15 variant-filled" on:click={launch}>Launch</button>
</div>
<p>{outcomeMsg}</p>
