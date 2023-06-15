<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { currentActiveTab } from '../Tabs';
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import InfoCircleIcon from '$lib/icons/svg/boxicons/InfoCircleIcon.svelte';
	import MessageDetailIcon from '$lib/icons/svg/boxicons/MessageDetailIcon.svelte';
	let currentTile: number = 0;
</script>

<div class="flex flex-col h-full item-center justify-center">
	<AppRail>
		<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
			<svelte:fragment slot="lead">
				<div class="flex flex-col items-center justify-center">
					<MessageDetailIcon />
					<span>History</span>
				</div>
			</svelte:fragment>
			<!-- <span>History</span> -->
			<!-- <div class="flex flex-col items-center justify-center">
				<MessageDetailIcon />
				<span>History</span>
			</div> -->
		</AppRailTile>
		<AppRailTile bind:group={currentTile} name="tile-3" value={1} title="tile-3">
			<svelte:fragment slot="lead">
				<div class="flex flex-col items-center justify-center">
					<InfoCircleIcon />
					<span>Alerts</span>
				</div>
			</svelte:fragment>
			<!-- <div class="flex flex-col items-center justify-center">
				<InfoCircleIcon />
				<span>Alerts</span>
			</div> -->
		</AppRailTile>
	</AppRail>
</div>

<!-- <div class="flex justify-center items-center h-full w-20 font-mono">
	<RadioGroup
		rounded="!border-none"
		display="flex-col h-full w-full !bg-transparent"
		spacing="space-y-2"
		active="variant-filled font-bold"
		hover="hover:variant-soft-surface hover:font-bold"
	>
		<RadioItem bind:group={$currentActiveTab} name="bottom-panel-tab-item" value={0}>
			<span class="capitalize text-sm">History</span>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTab} name="bottom-panel-tab-item" value={1}>
			<span class="capitalize text-sm">Notes</span>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTab} name="bottom-panel-tab-item" value={2}>
			<span class="capitalize text-sm">Alerts</span>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTab} name="bottom-panel-tab-item" value={3}>
			<span class="capitalize text-sm">Logbook</span>
		</RadioItem>
	</RadioGroup>
</div> -->
