<script lang="ts">
	import { modalStore, type ModalSettings, toastStore } from '@skeletonlabs/skeleton';
	import CogIcon from './icons/svg/boxicons/CogIcon.svelte';

	const appSettingsModalSettings: ModalSettings = {
		type: 'component',
		component: 'settingsAppMdal',
		response: (isSaved: boolean) => {
			if (isSaved === true) {
				toastStore.trigger({ message: `App settings saved` });
			} else {
				toastStore.trigger({ message: `App settings not saved` });
			}
		}
	};
</script>

<div>
	<div class="flex items-center">
		<CogIcon on:onClick={() => modalStore.trigger(appSettingsModalSettings)} />
	</div>
</div>
