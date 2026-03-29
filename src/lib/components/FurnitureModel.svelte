<script>
	import { T } from '@threlte/core';
	import { useGltf, useTexture } from '@threlte/extras';
	import { RepeatWrapping } from 'three';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		seatColor = '#f0ece6',
		material = 'cotton',
		...props
	} = $props();

	const gltf = useGltf('/real_furniture.glb');

	const materialProps = {
		cotton: { roughness: 0.95, normalScale: 0.1, envMapIntensity: 0.2 },
		leather: { roughness: 0.4, normalScale: 0.9, envMapIntensity: 1.4 },
		velvet: { roughness: 0.8, normalScale: 0.5, envMapIntensity: 0.9 },
		linen: { roughness: 0.85, normalScale: 1.0, envMapIntensity: 0.7 },
		suede: { roughness: 0.9, normalScale: 0.8, envMapIntensity: 0.6 }
	};

	function applySettings(texMap) {
		Object.values(texMap).forEach((tex) => {
			tex.wrapS = RepeatWrapping;
			tex.wrapT = RepeatWrapping;
			tex.repeat.set(1.5, 1.5);
			tex.flipY = false;
			tex.needsUpdate = true;
		});
		return texMap;
	}

	const textures = {
		cotton: useTexture(
			{ roughnessMap: '/textures/cotton/roughness.jpg', normalMap: '/textures/cotton/normal.jpg' },
			{ transform: applySettings }
		),
		leather: useTexture(
			{
				roughnessMap: '/textures/leather/roughness.jpg',
				normalMap: '/textures/leather/normal.jpg'
			},
			{ transform: applySettings }
		),
		velvet: useTexture(
			{ roughnessMap: '/textures/velvet/roughness.jpg', normalMap: '/textures/velvet/normal.jpg' },
			{ transform: applySettings }
		),
		linen: useTexture(
			{ roughnessMap: '/textures/linen/roughness.jpg', normalMap: '/textures/linen/normal.jpg' },
			{ transform: applySettings }
		),
		suede: useTexture(
			{ roughnessMap: '/textures/suede/roughness.jpg', normalMap: '/textures/suede/normal.jpg' },
			{ transform: applySettings }
		)
	};
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		{#await textures[material] then tex}
			<T.Mesh
				castShadow
				receiveShadow
				geometry={gltf.nodes.chair_body.geometry}
				position={[0, 2.03, 0]}
			>
				<T.MeshStandardMaterial
					roughnessMap={tex.roughnessMap}
					normalMap={tex.normalMap}
					color={seatColor}
					roughness={materialProps[material].roughness}
					normalScale={[materialProps[material].normalScale, materialProps[material].normalScale]}
					envMapIntensity={materialProps[material].envMapIntensity}
					metalness={0}
				/>
			</T.Mesh>
		{/await}
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.chair_stand.geometry}
			material={gltf.materials.Stand}
			position={[0, 0.75, 0]}
			scale={0.09}
		/>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>
