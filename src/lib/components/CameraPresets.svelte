<script>
	import { config } from '$lib/stores/configurator.svelte.js';

	const presets = [
		{ label: '3/4', position: [4, 3, 4] },
		{ label: 'Front', position: [6, 1, 0] },
		{ label: 'Side', position: [0, 1, 6] },
		{ label: 'Top', position: [0, 7, 0.1] }
	];

	let active = $state('3/4');

	function select(preset) {
		active = preset.label;
		config.cameraPosition = preset.position;
	}
</script>

<div class="flex flex-col gap-1.5">
	{#each presets as preset (preset.label)}
		<button
			onclick={() => select(preset)}
			class="rounded border px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-all
        {active === preset.label
				? 'border-gray-900 bg-gray-900 text-white'
				: 'border-gray-200 bg-white/80 text-gray-500 hover:border-gray-400 hover:text-gray-900'}"
		>
			{preset.label}
		</button>
	{/each}
</div>
