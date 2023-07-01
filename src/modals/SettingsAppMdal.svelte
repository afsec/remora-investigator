<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { VERSION } from '@sveltejs/kit';

	// Props of appSettingsModalSettings.
	export let parent: any;

	function onClickEventSaveAppSettings(): void {
		if ($modalStore[0].response) $modalStore[0].response(true);

		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-backdrop card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">
			<h3 class="h3 font-mono"><span class="uppercase">Settings</span> - v.{VERSION}</h3>
		</header>
		<main />
		<footer class="modal-footer {parent.regionFooter}">
			<button
				class="btn font-mono capitalize {parent.buttonNeutral}"
				on:click|preventDefault|stopPropagation={parent.onClose}
				>Cancel
			</button>
			<button
				class="btn font-mono capitalize {parent.buttonPositive}"
				on:click|preventDefault|stopPropagation={onClickEventSaveAppSettings}
				>Save
			</button>
		</footer>
	</div>
{/if}
