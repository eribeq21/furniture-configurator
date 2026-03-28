<script>
	import { T } from '@threlte/core';
	import { OrbitControls, Environment } from '@threlte/extras';
	import Furniture from './Furniture.svelte';
</script>

<T.PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50}>
	<OrbitControls />
</T.PerspectiveCamera>

<Environment
  url="/ferndale_studio_01_4k.hdr"
/>
<Furniture />
