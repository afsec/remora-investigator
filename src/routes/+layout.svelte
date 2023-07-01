<script lang="ts">
	//* The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	//* If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	//* Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { onMount } from 'svelte';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import {
		setModeUserPrefers,
		setModeCurrent,
		Toast,
		toastStore,
		storePopup,
		Modal,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { HistoryPanelStates, historyPanelContent } from '$stores/historyPanelContentStore';
	import SettingsAppMdal from '$modals/SettingsAppMdal.svelte';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		settingsAppMdal: {
			ref: SettingsAppMdal,
			slot: '<p>Remora Investiator</p>'
		}
	};

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	onMount(() => {
		//* Skeleton docs: Light mode is represented by true, while dark mode is represented by false.

		//* Set default theme mode to light
		setModeCurrent(true);

		//* Set default theme mode of LightSwitch component to light
		setModeUserPrefers(true);
	});

	$: {
		if ($historyPanelContent.state === HistoryPanelStates.RECEIVED_SUCCESS) {
			if ($historyPanelContent.data !== null && $historyPanelContent.data.length > 0) {
				toastStore.trigger({
					message: `Found <strong>${$historyPanelContent.data.length}</strong> events`
				});
			}
		}
	}
</script>

<Modal components={modalComponentRegistry} />
<Toast position="br" background="variant-filled" />

<slot />
