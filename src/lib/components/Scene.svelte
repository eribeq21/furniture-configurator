<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Furniture from './Furniture.svelte';
</script>

<T.PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50}>
	<OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[5, 10, 5]} intensity={1} />

<Furniture />
