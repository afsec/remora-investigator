<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import InfoCircleIcon from '$lib/icons/svg/boxicons/InfoCircleIcon.svelte';
	import MessageDetailIcon from '$lib/icons/svg/boxicons/MessageDetailIcon.svelte';
	import { currentActiveTab } from '$stores/tabs';
</script>

<div class="flex flex-col h-full items-center justify-center">
	<div class="flex flex-coll items-center justify-center">
		<AppRail>
			<AppRailTile bind:group={$currentActiveTab} name="History" value={0} title="History">
				<div class="flex flex-col items-center justify-center">
					<MessageDetailIcon />
					<span>History</span>
				</div>
			</AppRailTile>
			<AppRailTile bind:group={$currentActiveTab} name="Alerts" value={1} title="Alerts">
				<div class="flex flex-col items-center justify-center">
					<InfoCircleIcon />
					<span>Alerts</span>
				</div>
			</AppRailTile>
		</AppRail>
	</div>
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
