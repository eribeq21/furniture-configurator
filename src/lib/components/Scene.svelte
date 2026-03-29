<script>
	import { T } from '@threlte/core';
	import {
		OrbitControls,
		Environment,
		ContactShadows,
		Float,
		SoftShadows,
		interactivity
	} from '@threlte/extras';

	import ChairModel from './ChairModel.svelte';
	import { config } from '$lib/stores/configurator.svelte.js';

	interactivity();
</script>

<T.PerspectiveCamera makeDefault position={[4, 3, 4]} fov={50}>
	<OrbitControls
		target={[0, -0.2, 0]}
		enablePan={false}
		minPolarAngle={0.3}
		maxPolarAngle={1.3}
		minDistance={3}
		maxDistance={10}
		enableDamping
		dampingFactor={0.05}
		autoRotate
		autoRotateSpeed={0.5}
	/>
</T.PerspectiveCamera>

<SoftShadows size={25} samples={16} focus={0.5} />
<Environment url="/hdr/monochrome_studio_04_4k.hdr" />

<ContactShadows
	position={[0, -1.01, 0]}
	frames={200}
	scale={15}
	blur={2.5}
	opacity={0.2}
	resolution={256}
	color="#000000"
/>

<Float speed={0.6} floatIntensity={0.25}>
	<ChairModel
		position={[0, -1, 0]}
		rotation={[0, 0, 0]}
		scale={[1, 1, 1]}
		seatColor={config.seatColor}
		material={config.material}
		baseStyle={config.selectedModel}
	/>
</Float>