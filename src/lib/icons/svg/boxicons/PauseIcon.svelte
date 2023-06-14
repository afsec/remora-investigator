<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let fill: string = 'currentColor';
	export let size: number = 24;

	const dispatch = createEventDispatcher();

	function onClickEvent() {
		dispatch('onClick');
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	{fill}
	on:click|preventDefault|stopPropagation={onClickEvent}
>
	<path d="M8 7h3v10H8zm5 0h3v10h-3z" />
</svg>
