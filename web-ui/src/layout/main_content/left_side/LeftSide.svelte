<script lang="ts">
	import Hdivider from '$lib/Hdivider.svelte';
	import EventsPanel from './EventsPanel.svelte';
	import LeftSideToolbar from './LeftSideToolbar.svelte';
	import NotesPanel from './NotesPanel.svelte';
</script>

<div class="flex flex-col w-52 bg-base-300">
	<LeftSideToolbar />
	<EventsPanel />
	<Hdivider />
	<NotesPanel />
</div>
