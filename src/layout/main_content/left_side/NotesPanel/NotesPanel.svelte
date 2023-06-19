<script lang="ts">
	import SaveIcon from '$lib/icons/svg/boxicons/SaveIcon.svelte';
	import AddIcon from '$lib/icons/svg/monoicons/AddIcon.svelte';
	import BanIcon from '$lib/icons/svg/monoicons/BanIcon.svelte';
	import EditIcon from '$lib/icons/svg/monoicons/EditIcon.svelte';
	import { PanelMode, panelModeStore, togglePanelMode } from './panelTypes';

	let userTextInput = '';

	function onClickedAddIcon(): void {
		togglePanelMode();
	}

	function onClickedEditIcon(): void {
		togglePanelMode();
	}

	function onClickSaveIcon(): void {
		togglePanelMode();
	}
</script>

<div class="flex h-1/2 flex-col gap-2 rounded-md justify-between">
	<div
		class="flex h-8 p-2 items-center justify-between rounded-md bg-surface-100 dark:bg-surface-500"
	>
		<div class="flex items-center">
			<span class="text-xs font-bold">Notes</span>
			<span class="ml-1 text-xs font-bold">id: 30 |</span>
			<span class="ml-1 text-xs font-bold">Size: 23 B</span>
		</div>
		<div class="flex items-center">
			<!-- TODO: If possible turn in switch expression -->
			<!--* From PanelModel to Action -->
			{#if $panelModeStore === PanelMode.NO_NOTE}
				<AddIcon on:invoke={() => onClickedAddIcon()} />
			{:else if $panelModeStore === PanelMode.EDIT}
				<SaveIcon on:onClick={() => onClickSaveIcon()} />
			{:else if $panelModeStore === PanelMode.SAVED || $panelModeStore === PanelMode.CANCELED}
				<EditIcon on:invoke={() => onClickedEditIcon()} />
			{:else}
				<span class="h-6 w-6" />
			{/if}
		</div>
	</div>

	<!--* From PanelModel to View -->
	{#if $panelModeStore === PanelMode.NO_NOTE}
		<span
			class="flex border-[1px] border-surface-500 dark:border-surface-500 rounded-md h-full items-center justify-center font-bold"
		>
			NO NOTE
		</span>
	{:else if $panelModeStore === PanelMode.EDIT}
		<textarea
			class="flex h-full max-h-full overflow-auto textarea textarea-bordered rounded-md resize-none"
			bind:value={userTextInput}
		/>
		<div class="relative">
			<button
				type="button"
				class="z-10 absolute btn btn-icon btn-xs bottom-3 right-3 variant-filled"
				on:click|preventDefault|stopPropagation={() => {
					userTextInput = '';
					panelModeStore.set(PanelMode.CANCELED);
				}}
			>
				<BanIcon
					size={20}
					on:onClick={() => {
						userTextInput = '';
						panelModeStore.set(PanelMode.CANCELED);
					}}
				/>
			</button>
		</div>
	{:else if $panelModeStore === PanelMode.SAVED || $panelModeStore === PanelMode.CANCELED}
		<textarea
			class="flex h-full max-h-full overflow-auto textarea textarea-bordered rounded-md resize-none disabled:!cursor-text"
			bind:value={userTextInput}
			disabled={true}
		/>
		<!--! IMPOSSIBLE STATE -->
	{:else}
		<span
			class="flex border-2 border-surface-100 dark:border-surface-500 rounded-md border-md h-full items-center justify-center font-bold"
			>IMPOSSIBLE STATE
		</span>
	{/if}
</div>
