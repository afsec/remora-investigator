<script>
	import MessageAltDetailIcon from '$lib/icons/svg/boxicons/MessageDetailIcon.svelte';
	import InfoCircleIcon from '$lib/icons/svg/boxicons/InfoCircleIcon.svelte';
</script>

<div
	class="flex h-8 p-2 items-center rounded-md justify-between bg-surface-100 dark:bg-surface-500"
>
	<div class="flex font-mono text-sm items-center">
		<!-- request info -->
		<div class="flex items-center">
			<!-- label -->
			<span class="font-bold text-base">Response</span>
		</div>
		<!-- info -->
		<div class="flex items-center p-2 gap-2">
			<div class="font-bold">id: 42</div>
			<div>| Headers: <span class="font-bold">14</span></div>
			<div>| Body size: <span class="font-bold">1.17 KiB</span></div>
		</div>
	</div>
	<!-- button group -->
	<div class="flex items-center gap-2">
		<button type="button" class="btn-icon btn-icon-sm">
			<InfoCircleIcon />
		</button>
	</div>
</div>
