<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { currentActiveTabLocalStorage } from '../Tabs';
</script>

<div class="flex justify-center items-center h-full w-52 font-mono">
	<RadioGroup
		rounded="!border-2 !border-surface-500 !dark:border-surface-500 rounded-md"
		display="flex-col h-full w-full !bg-transparent"
		spacing="space-y-2"
		active="variant-filled font-bold"
		hover="hover:variant-soft-surface hover:font-bold"
	>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={0}>
			<span class="capitalize text-sm">History (Browser)</span>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={1}>
			<span class="capitalize text-sm">Notes (Events)</span>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={2}>
			<span class="capitalize text-sm">Alerts (Risks)</span>
		</RadioItem>
		<RadioItem bind:group={$currentActiveTabLocalStorage} name="bottom-panel-tab-item" value={3}>
			<span class="capitalize text-sm">Logbook (Analysis)</span>
		</RadioItem>
	</RadioGroup>
</div>
