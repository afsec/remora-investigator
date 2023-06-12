<script>
	import LeftSide from './left_side/LeftSide.svelte';
	import RightSide from './right_side/RightSide.svelte';
</script>

<!-- <div class="flex h-48 bg-base-300"> -->
<div
	class="flex gap-x-2 h-48 items-center bg-surface-100 dark:bg-surface-500 rounded-md justify-between"
>
	<LeftSide />
	<RightSide />
</div>
