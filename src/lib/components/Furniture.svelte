<script>
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	const gltf = useGltf('/real_furniture.glb');
</script>

{#await gltf then model}
	<T is={model.scene} />
{/await}
