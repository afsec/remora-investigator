<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import MessageDetailIcon from '$lib/icons/svg/boxicons/MessageDetailIcon.svelte';
	import InfoCircleIcon from '$lib/icons/svg/boxicons/InfoCircleIcon.svelte';
	import { currentActiveTab } from '$stores/tabs';
</script>

<div>
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
