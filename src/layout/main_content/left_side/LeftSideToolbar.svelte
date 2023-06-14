<script lang="ts">
	import Configurator from '$lib/Configurator.svelte';
	import Launcher from '$lib/Launcher.svelte';
	import Refresher from '$lib/Refresher.svelte';

	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div
	class="flex h-8 p-2 items-center bg-surface-100 dark:bg-surface-500 rounded-md justify-between"
>
	<!-- button group -->
	<div class="flex w-full items-center justify-between gap-1">
		<div class="flex items-center gap-2">
			<Launcher />
			<Refresher />
			<Configurator />
		</div>
		<LightSwitch />
	</div>
</div>
