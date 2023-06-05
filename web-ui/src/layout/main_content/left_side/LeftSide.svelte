<script lang="ts">
	import Hdivider from '$lib/Hdivider.svelte';

	import EventsPanel from './EventsPanel.svelte';
	import NotesPanel from './NotesPanel.svelte';
</script>

<div class="flex flex-col w-52 bg-base-300">
	<EventsPanel />
	<Hdivider />
	<NotesPanel />
</div>
