<script>
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	let { position, rotation, scale } = $props();

	const gltf = useGltf('/real_furniture.glb');
</script>

{#await gltf then model}
	<T is={model.scene} {position} {rotation} {scale} castShadow receiveShadow />
{/await}
