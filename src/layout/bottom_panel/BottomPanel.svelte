<script>
	import LeftSide from './left_side/LeftSide.svelte';
	import RightSide from './right_side/RightSide.svelte';
</script>

<!--
	<span
		class="flex
			border-[1px]
			border-surface-500
			dark:border-surface-500
			rounded-md h-full
			items-center
			justify-center
			font-bold"
	>
		NO NOTE
	</span>
-->
<div
	class="flex gap-x-2 h-48 items-center bg-surface-100 dark:bg-surface-900 justify-between border-[1px] border-surface-500 dark:border-surface-500 rounded-md"
>
	<LeftSide />
	<RightSide />
</div>
