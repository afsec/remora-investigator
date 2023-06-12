<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { currentActiveTabLocalStorage } from '../Tabs';
</script>

<div
	class="flex justify-center items-center h-full w-52 bg-base-300 border-[1px] border-surface-500 dark:border-surface-500 rounded-md"
>
	<RadioGroup
		rounded="rounded-md"
		display="flex-col h-full w-full overflow-y-scroll"
		spacing="space-y-2"
		active="variant-filled font-bold"
		hover="hover:variant-ghost"
	>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={0}>
			<div class="flex flex-col justify-center items-center">
				<span class="capitalize">History</span>
				<span class="capitalize">(Browser)</span>
			</div>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={1}>
			<div class="flex flex-col justify-center items-center">
				<span class="capitalize">Notes</span>
				<span class="capitalize">(Events)</span>
			</div>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={2}>
			<div class="flex flex-col justify-center items-center">
				<span class="capitalize">Alerts</span>
				<span class="capitalize">(Risks)</span>
			</div>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={3}>
			<div class="flex flex-col justify-center items-center">
				<span class="capitalize">Logbook</span>
				<span class="capitalize">(Analysis)</span>
			</div>
		</RadioItem>
	</RadioGroup>
</div>
