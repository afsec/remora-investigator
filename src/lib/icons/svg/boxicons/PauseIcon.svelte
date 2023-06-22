<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let fill: string = 'currentColor';
	export let size: number = 24;

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('onClick');
	}
</script>

<button type="button" class={$$props.class} on:click|preventDefault|stopPropagation={onClick}>
	<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" {fill}>
		<path d="M8 7h3v10H8zm5 0h3v10h-3z" />
	</svg>
</button>
