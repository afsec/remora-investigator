<script lang="ts">
	let markdown = '';

	function onTextareInputChange() {
		// mdOutput = marked(userInput);
	}
</script>

<div class="flex h-1/2 flex-col gap-2 rounded-md justify-between">
	<div
		class="flex h-8 p-2 items-center rounded-md justify-center bg-surface-100 dark:bg-surface-500"
	>
		<span class="font-bold">Events</span>
	</div>
	<textarea
		bind:value={markdown}
		on:input={() => onTextareInputChange()}
		class="flex h-full textarea textarea-bordered rounded-md resize-none"
		placeholder="Type something"
	/>
</div>
