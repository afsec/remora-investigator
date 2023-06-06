<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';

	// const invoke = (str: string, obj: any): Promise<string> => Promise.resolve('Some text from outside');

	let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		outcomeMsg = await invoke('launch_interceptor', { sessionName });
		alert(outcomeMsg);
	}
</script>

<div>
	<div class="flex items-center">
		<button type="button" class="btn btn-sm h-6 font-bold variant-filled" on:click={launch}
			>Launch</button
		>
	</div>
</div>
