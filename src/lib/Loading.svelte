<script lang="ts">
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-surface-500))', start: 75, end: 100 }
	];
</script>

<ConicGradient width="w-8" stops={conicStops} spin />
