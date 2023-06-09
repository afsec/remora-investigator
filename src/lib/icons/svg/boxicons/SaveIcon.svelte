<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let fill: string = 'currentColor';
	export let size: number = 24;

	const dispatch = createEventDispatcher();

	function tauriInvoke() {
		dispatch('invoke');
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	{fill}
	on:click|preventDefault|stopPropagation={tauriInvoke}
	><path
		d="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"
	/>
</svg>
