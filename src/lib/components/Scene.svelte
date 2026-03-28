<script>
	import { T } from '@threlte/core';
	import { OrbitControls, Environment } from '@threlte/extras';
	import Furniture from './Furniture.svelte';
</script>

<T.PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50}>
	<OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
</T.PerspectiveCamera>

<Environment url="/ferndale_studio_01_4k.hdr" />

<!-- Position of the furniture -->
<Furniture position={[0, -1, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} />
