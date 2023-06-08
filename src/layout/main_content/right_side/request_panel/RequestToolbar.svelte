<script>
	import RequestIdIcon from '$lib/icons/svg/RequestIdIcon.svelte';
	import EditIcon from '$lib/icons/svg/monoicons/EditIcon.svelte';
</script>

<div
	class="flex h-8 p-2 items-center rounded-md justify-between bg-surface-100 dark:bg-surface-500"
>
	<div class="flex font-mono text-sm items-center">
		<!-- request info -->
		<div class="flex items-center">
			<!-- label -->
			<p class="font-bold text-base">Request</p>
		</div>
		<!-- info -->
		<div class="flex items-center p-2 gap-2">
			<p class="font-bold">id: 42</p>
			<div>
				<RequestIdIcon />
			</div>
			<p>| Headers: <span class="font-bold">14</span></p>
			<p>| Body size: <span class="font-bold">1.17 KiB</span></p>
		</div>
	</div>
	<!-- button group -->
	<div>
		<EditIcon />
	</div>
</div>
