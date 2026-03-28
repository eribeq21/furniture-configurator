<script>
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/Scene.svelte';
</script>

<div class="flex h-screen w-screen overflow-hidden">
	<!-- Left: Canvas -->
	<div class="min-w-0 flex-1">
		<Canvas shadows class="h-full w-full">
			<Scene />
		</Canvas>
	</div>
	<!-- Right: Sidebar -->
	<div class="h-full w-80 border-l border-gray-300 bg-gray-100 p-4">
		<!-- Sidebar content goes here -->
		<h2 class="mb-4 text-lg font-bold">Sidebar</h2>
		<p>Sidebar contet</p>
	</div>
</div>
