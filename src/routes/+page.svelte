<script>
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/Scene.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import CameraPresets from '$lib/components/CameraPresets.svelte';
	import { config } from '$lib/stores/configurator.svelte.js';

	function togglePillow() {
		config.pillow = !config.pillow;
	}
</script>

<div class="flex h-screen w-screen overflow-hidden">
	<!-- Left: Canvas -->
	<div class="relative min-w-0 flex-1">
		<Canvas shadows class="h-full w-full">
			<Scene />
		</Canvas>
		<div class="absolute top-4 left-4 z-10">
			<CameraPresets />
		</div>

		<!-- Pillow image toggle -->
		<div class="absolute bottom-6 left-6">
			<button
				onclick={togglePillow}
				title={config.pillow ? 'Remove pillow' : 'Add pillow'}
				aria-pressed={config.pillow}
				class={`group relative overflow-hidden rounded-[28px] border p-2 backdrop-blur-xl transition-all duration-300 ${
					config.pillow
						? 'border-white/60 bg-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.22)] ring-1 ring-white/40'
						: 'border-white/15 bg-black/20 shadow-[0_14px_40px_rgba(0,0,0,0.18)] hover:border-white/30 hover:bg-white/10'
				}`}
			>
				<img
					src="/images/Chair_With_Pillow.png"
					alt="Pillow option"
					class={`h-36 w-36 rounded-[22px] object-cover transition-all duration-300 ${
						config.pillow
							? 'scale-[1.03] opacity-100 saturate-110'
							: 'opacity-80 grayscale-[0.15] group-hover:scale-[1.02] group-hover:opacity-100'
					}`}
				/>

				<!-- subtle selected badge -->
				<div
					class={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold transition-all duration-300 ${
						config.pillow
							? 'border-white/70 bg-white text-black'
							: 'border-white/20 bg-black/30 text-white/0 group-hover:text-white/70'
					}`}
				>
					✓
				</div>

				<!-- bottom overlay label -->
				<div
					class={`pointer-events-none absolute inset-x-2 bottom-2 rounded-2xl px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
						config.pillow
							? 'bg-black/45 text-white'
							: 'bg-black/30 text-white/65'
					}`}
				>
					Pillow
				</div>
			</button>
		</div>
	</div>

	<!-- Right: Sidebar -->
	<div class="h-full w-72 border-l border-gray-200 bg-gray-50">
		<Sidebar />
	</div>
</div>