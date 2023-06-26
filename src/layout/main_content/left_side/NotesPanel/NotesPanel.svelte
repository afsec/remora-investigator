<script lang="ts">
	import SaveIcon from '$lib/icons/svg/boxicons/SaveIcon.svelte';
	import AddIcon from '$lib/icons/svg/monoicons/AddIcon.svelte';
	import BanIcon from '$lib/icons/svg/monoicons/BanIcon.svelte';
	import CopyIcon from '$lib/icons/svg/monoicons/CopyIcon.svelte';
	import EditIcon from '$lib/icons/svg/monoicons/EditIcon.svelte';
	import { clipboard, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { PanelMode, panelModeStore, togglePanelMode } from './panelTypes';

	const cancelPopupHover: PopupSettings = {
		event: 'hover',
		target: 'cancelPopupHover',
		placement: 'top'
	};

	const copyPopupHover: PopupSettings = {
		event: 'hover',
		target: 'copyPopupHover',
		placement: 'top'
	};

	let userTextInput = '';

	// Use this aux variable when User cancel the edit whe already has content.
	let userOldTextInput = '';

	function onClickedAddIcon(): void {
		togglePanelMode();
	}

	function onClickedEditIcon(): void {
		togglePanelMode();
		userOldTextInput = userTextInput;
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
			{#if $panelModeStore === PanelMode.NO_NOTE}
				<AddIcon on:onClick={() => onClickedAddIcon()} />
			{:else if $panelModeStore === PanelMode.EDIT}
				<SaveIcon on:onClick={() => onClickSaveIcon()} />
			{:else if $panelModeStore === PanelMode.SAVED}
				<EditIcon on:onClick={() => onClickedEditIcon()} />
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

		<div class="relative" use:popup={cancelPopupHover}>
			<button class="z-10 absolute bottom-4 right-3" use:popup={cancelPopupHover}>
				<BanIcon
					class=" btn btn-sm bottom-4 right-3 variant-filled [&>*]:pointer-events-none"
					size={20}
					on:onClick={() => {
						panelModeStore.set(PanelMode.SAVED);
						userTextInput = userOldTextInput;
					}}
				/>
			</button>

			<div class="z-10 card p-1 variant-filled" data-popup="cancelPopupHover">
				<span class="text-xs font-bold">Cancel</span>
				<div class="arrow variant-filled" />
			</div>
		</div>
	{:else if $panelModeStore === PanelMode.SAVED}
		<textarea
			class="flex h-full max-h-full overflow-auto textarea textarea-bordered rounded-md resize-none disabled:!cursor-text"
			bind:value={userTextInput}
			data-clipboard="noteContent"
			disabled={true}
		/>

		<div class="relative" use:popup={copyPopupHover}>
			<button
				class="z-10 absolute bottom-4 right-3 btn btn-sm variant-filled"
				use:popup={copyPopupHover}
				use:clipboard={{ input: 'noteContent' }}
			>
				<CopyIcon size={20} referenceClipboard="noteContent" />
			</button>

			<div class="z-10 card p-1 variant-filled" data-popup="copyPopupHover">
				<span class="text-xs font-bold">Copy</span>
				<div class="arrow variant-filled" />
			</div>
		</div>

		<!--! IMPOSSIBLE STATE -->
	{:else}
		<span
			class="flex border-2 border-surface-100 dark:border-surface-500 rounded-md border-md h-full items-center justify-center font-bold"
			>IMPOSSIBLE STATE
		</span>
	{/if}
</div>
