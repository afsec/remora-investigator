<script lang="ts">
	import SaveIcon from '$lib/icons/svg/boxicons/SaveIcon.svelte';
	import AddIcon from '$lib/icons/svg/monoicons/AddIcon.svelte';
	import EditIcon from '$lib/icons/svg/monoicons/EditIcon.svelte';
	import { marked } from 'marked';
	import { PanelMode, panelModeStore, togglePanelMode } from './panelTypes';
	import DOMPurify from 'dompurify';

	let userTextInput = '';
	let mdOutput = '';

	let renderer = new marked.Renderer();

	renderer.br = function (): string {
		return '<br />';
	};

	renderer.link = function (href: string | null, title: string | null, text: string): string {
		console.log('href');
		console.log(href);
		console.log('title');
		console.log(title);
		console.log('text');
		console.log(text);

		return `<a class="anchor" href="${href}">${text}</a>`;
	};

	renderer.list = function (body: string, ordered: boolean, start: number) {
		return `<ul class="list">${body}</ul>`;
	};

	renderer.table = function (header: string, body: string): string {
		return `<div class="table-container">
			<table class="table table-hover">
				<thead>${header}</thead>
				<tbody>${body}</tbody>
			</table>	
		</div`;
	};

	renderer.blockquote = function (body: string): string {
		return `<blockquote class='blockquote'>${body}</blockquote>`;
	};

	renderer.code = function (body: string): string {
		return `<code class='code w-full p-1'>${body}</code>`;
	};

	renderer.hr = function (): string {
		return '<hr class="!border-t-4" />';
	};

	renderer.heading = function (body: string, ordered: number, start: string): string {
		switch (ordered) {
			case 1:
				return `<h1 class="h1">${body}</h1>`;

			case 2:
				return `<h2 class="h2">${body}</h2>`;

			case 3:
				return `<h3 class="h3">${body}</h3>`;

			case 4:
				return `<h4 class="h4" >${body}</h4>`;

			case 5:
				return `<h5 class="h5">${body}</h5>`;

			case 6:
				return `<h6 class="h6" >${body}</h6>`;

			default:
				return '';
		}
	};

	console.log('OUTPUT MARKED');
	function onClickedAddIcon(): void {
		togglePanelMode();
	}

	function onClickedEditIcon(): void {
		togglePanelMode();
	}

	function onClickSaveIcon(): void {
		togglePanelMode();
		mdOutput = marked(DOMPurify.sanitize(userTextInput), {
			breaks: true,
			gfm: true,
			headerIds: false,
			mangle: false,
			renderer: renderer
		});

		console.log(mdOutput);
	}

	function onTextareInputChange(): void {
		console.log(userTextInput);
	}
</script>

<div class="flex h-1/2 flex-col gap-2 rounded-md justify-between">
	<div
		class="flex h-8 p-2 items-center justify-between rounded-md bg-surface-100 dark:bg-surface-500"
	>
		<div class="flex items-center">
			<span class="text-xs font-bold">Notes</span>
			<span class="ml-1 text-xs font-bold">id: 30 |</span>
			<span class="ml-1 text-xs font-bold">Size: 23 B</span>
		</div>
		<div class="flex items-center">
			<!-- TODO: If possible turn in switch expression -->
			<!--* From PanelModel to Action -->
			{#if $panelModeStore === PanelMode.NO_NOTE}
				<AddIcon on:invoke={() => onClickedAddIcon()} />
			{:else if $panelModeStore === PanelMode.EDIT}
				<SaveIcon on:invoke={() => onClickSaveIcon()} />
			{:else if $panelModeStore === PanelMode.SAVED}
				<EditIcon on:invoke={() => onClickedEditIcon()} />
			{:else}
				<span class="h-6 w-6" />
			{/if}
		</div>
	</div>

	<!--* From PanelModel to View -->
	{#if $panelModeStore === PanelMode.NO_NOTE}
		<span
			class="flex border-2 border-surface-500 dark:border-surface-500 rounded-md border-md h-full items-center justify-center font-bold"
		>
			NO NOTE
		</span>
	{:else if $panelModeStore === PanelMode.EDIT}
		<textarea
			class="flex h-full max-h-full overflow-auto textarea textarea-bordered rounded-md resize-none"
			bind:value={userTextInput}
			on:input={() => onTextareInputChange()}
		/>
	{:else if $panelModeStore === PanelMode.SAVED}
		<div class="flex pre h-full p-1 max-h-full p overflow-auto rounded-md">
			{@html mdOutput}
		</div>
		<!--! IMPOSSIBLE STATE -->
	{:else}
		<span
			class="flex border-2 border-surface-100 dark:border-surface-500 rounded-md border-md h-full items-center justify-center font-bold"
			>IMPOSSIBLE STATE
		</span>
	{/if}
</div>
