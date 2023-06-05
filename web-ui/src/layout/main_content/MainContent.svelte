<script lang="ts">
	import Vdivider from '$lib/Vdivider.svelte';
	import LeftSide from './left_side/LeftSide.svelte';
	import RightSide from './right_side/RightSide.svelte';
</script>

<div class="flex grow">
	<LeftSide />
	<Vdivider />
	<RightSide />
</div>
