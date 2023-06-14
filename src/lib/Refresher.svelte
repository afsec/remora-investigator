<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';
	import RefreshIcon from '$lib/icons/svg/boxicons/RefreshIcon.svelte';
	// const invoke = (str: string, obj: any): Promise<string> => Promise.resolve('Some text from outside');

	// let sessionName = '';
	let outcomeMsg = '';

	async function launch() {
		outcomeMsg = await invoke('list_events', {});
		alert(outcomeMsg);
	}
</script>

<div>
	<div class="flex items-center">
		<button type="button" class="btn-icon btn-icon-sm" on:click={launch}>
			<RefreshIcon />
		</button>
	</div>
</div>
