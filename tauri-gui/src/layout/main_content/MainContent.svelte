<script lang="ts">
	import Greet from '$lib/Greet.svelte';
</script>

<div class="flex grow border-neutral">
	<div class="flex flex-col w-52 bg-base-300">
		<div class="flex flex-col h-1/2 bg-base-300">
			<div class="flex h-1/2 bg-base-300">
				<p>Events</p>
			</div>
			<div class="flex h-1/2 bg-base-300">
				<Greet />
			</div>
		</div>
		<!-- DIVIDER BEGIN -->
		<div class="flex h-1 bg-base-100" />
		<div class="flex grow border-neutral">
			<div class="flex flex-col w-52 bg-base-300">
				<div class="flex flex-col h-1/2 bg-base-300">
					<div class="flex h-1/2 bg-base-300">
						<p>Events</p>
					</div>
					<div class="flex h-1/2 bg-base-300">
						<Greet />
					</div>
				</div>
				<!-- DIVIDER BEGIN -->
				<div class="flex h-1 bg-base-100" />
				<!-- DIVIDER END -->
				<div class="flex h-1/2 bg-base-300">
					<p>Notes</p>
				</div>
			</div>
			<!-- DIVIDER BEGIN -->
			<div class="flex flex-col w-1 bg-base-100" />
			<!-- DIVIDER END -->
			<div class="flex grow border-neutral">
				<div class="flex flex-col w-1/2 bg-base-300">
					<div class="flex h-1/2 bg-base-300">
						<p>Request Header Panel</p>
					</div>
					<!-- DIVIDER BEGIN -->
					<div class="flex h-1 bg-base-100" />
					<!-- DIVIDER END -->
					<div class="flex h-1/2 bg-base-300">
						<p>Request Body Panel</p>
					</div>
				</div>
				<!-- DIVIDER BEGIN -->
				<div class="flex flex-col w-1 bg-base-100" />
				<!-- DIVIDER END -->
				<div class="flex flex-col w-1/2 bg-base-300">
					<div class="flex h-1/2 bg-base-300">
						<p>Response Header Panel</p>
					</div>
					<!-- DIVIDER BEGIN -->
					<div class="flex h-1 bg-base-100" />
					<!-- DIVIDER END -->
					<div class="flex h-1/2 bg-base-300">
						<p>Response Body Panel</p>
					</div>
				</div>
			</div>
		</div>
		<!-- DIVIDER END -->
		<div class="flex h-1/2 bg-base-300">
			<p>Notes</p>
		</div>
	</div>
	<!-- DIVIDER BEGIN -->
	<div class="flex flex-col w-1 bg-base-100" />
	<!-- DIVIDER END -->
	<div class="flex grow border-neutral">
		<div class="flex flex-col w-1/2 bg-base-300">
			<div class="flex h-1/2 bg-base-300">
				<p>Request Header Panel</p>
			</div>
			<!-- DIVIDER BEGIN -->
			<div class="flex h-1 bg-base-100" />
			<!-- DIVIDER END -->
			<div class="flex h-1/2 bg-base-300">
				<p>Request Body Panel</p>
			</div>
		</div>
		<!-- DIVIDER BEGIN -->
		<div class="flex flex-col w-1 bg-base-100" />
		<!-- DIVIDER END -->
		<div class="flex flex-col w-1/2 bg-base-300">
			<div class="flex h-1/2 bg-base-300">
				<p>Response Header Panel</p>
			</div>
			<!-- DIVIDER BEGIN -->
			<div class="flex h-1 bg-base-100" />
			<!-- DIVIDER END -->
			<div class="flex h-1/2 bg-base-300">
				<p>Response Body Panel</p>
			</div>
		</div>
	</div>
</div>
