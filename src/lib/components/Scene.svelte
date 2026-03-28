<script>
	import { T } from '@threlte/core';
	import { OrbitControls, Environment, ContactShadows } from '@threlte/extras';
	import Furniture from './Furniture.svelte';
</script>

<T.PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50}>
	<OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
</T.PerspectiveCamera>

<Environment url="/ferndale_studio_01_4k.hdr" />

<!-- Fake soft ground shadow -->
<ContactShadows
	position={[0, -1.01, 0]}
	scale={15}
	blur={2.5}
	opacity={0.2}
	resolution={256}
  color="#000000"
/>

<!-- Position of the furniture -->
<Furniture position={[0, -1, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} />
