<script>
	import { T } from '@threlte/core';
	import { OrbitControls, Environment, ContactShadows } from '@threlte/extras';
	import Furniture from './Furniture.svelte';
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

<Environment url="/ferndale_studio_01_4k.hdr" />
<T.Mesh position={[0, -0.93, 0]} rotation={[-Math.PI / 2, 0, 0]}>
	<T.CircleGeometry args={[0.8, 64]} />
	<T.MeshStandardMaterial color="#000000" transparent opacity={0.5} roughness={1} metalness={0} />
</T.Mesh>
<!-- Fake soft ground shadow -->
<ContactShadows
	position={[0, -1.01, 0]}
	frames={200}
	scale={15}
	blur={2.5}
	opacity={0.2}
	resolution={256}
	color="#000000"
/>

<!-- Position of the furniture -->
<Furniture position={[0, -1, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} />
