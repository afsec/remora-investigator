<script lang="ts">
	// import { invoke } from '@tauri-apps/api/tauri';

	const invoke = (str: string, obj: any): string => 'Some text from outside';
	let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		outcomeMsg = invoke('launch_interceptor', { sessionName });
	}
</script>

<div class="flex items-center">
	<button type="button" class="btn btn-sm h-6 font-bold variant-filled" on:click={launch}
		>Launch</button
	>
</div>
<p>{outcomeMsg}</p>
