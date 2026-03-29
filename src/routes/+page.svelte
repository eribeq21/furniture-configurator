<script>
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/Scene.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import CameraPresets from '$lib/components/CameraPresets.svelte';
</script>

<div class="flex h-screen w-screen overflow-hidden">
	<!-- Left: Canvas -->
	<div class="min-w-0 flex-1">
		<Canvas shadows class="h-full w-full">
			<Scene />
		</Canvas>
		<!-- Overlaid on top of canvas, top-left corner -->
		<div class="absolute top-4 left-4">
			<CameraPresets />
		</div>
	</div>
	<!-- Right: Sidebar -->
	<div class="h-full w-72 border-l border-gray-200 bg-gray-50">
		<Sidebar />
	</div>
</div>
