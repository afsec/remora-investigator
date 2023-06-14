<script lang="ts">
	export let fill: string = 'currentColor';
	export let size: number = 24;

	const svg = `<svg
				xmlns="http://www.w3.org/2000/svg"
				width=${size}
				height=${size}
				viewBox="0 0 24 24"
				fill=${fill}
				>
				<path d="M8 7h3v10H8zm5 0h3v10h-3z"></path>
				</svg>`;
</script>

{@html svg}
