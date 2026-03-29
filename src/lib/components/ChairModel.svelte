<script>
	import { T } from '@threlte/core'
	import { useGltf, useTexture, useGltfAnimations } from '@threlte/extras'
	import { RepeatWrapping, LoopOnce } from 'three'

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		seatColor = '#f0ece6',
		material = 'cotton',
		baseStyle = 'pedestal',
		pillow = false,
		...props
	} = $props()

	const gltf = useGltf('/Chair_Blender_ITP.glb')
	const { actions } = useGltfAnimations(gltf, ref)

	const materialProps = {
		cotton: { roughness: 0.95, normalScale: 0.1, envMapIntensity: 0.2 },
		leather: { roughness: 0.4, normalScale: 0.9, envMapIntensity: 1.4 },
		velvet: { roughness: 0.8, normalScale: 0.5, envMapIntensity: 0.9 }
	}

	function applySettings(texMap) {
		Object.values(texMap).forEach((tex) => {
			if (!tex || typeof tex !== 'object' || !('wrapS' in tex)) return
			tex.wrapS = RepeatWrapping
			tex.wrapT = RepeatWrapping
			tex.repeat.set(1.5, 1.5)
			tex.flipY = false
			tex.needsUpdate = true
		})
		return texMap
	}

	const textures = {
		cotton: useTexture(
			{
				roughnessMap: '/textures/cotton/roughness.jpg',
				normalMap: '/textures/cotton/normal.jpg'
			},
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
			{
				roughnessMap: '/textures/velvet/roughness.jpg',
				normalMap: '/textures/velvet/normal.jpg'
			},
			{ transform: applySettings }
		)
	}

	let prevPillow = $state("pillow");

	$effect(() => {
		const actionMap = $actions
		if (!actionMap) return

		const pillowAction =
			actionMap.Pillow_ClothAction ||
			actionMap.PillowDrop ||
			actionMap.Pillow_Cloth ||
			Object.values(actionMap)[0]

		if (!pillowAction) return

		if (pillow && !prevPillow) {
			pillowAction.reset()
			pillowAction.setLoop(LoopOnce, 1)
			pillowAction.clampWhenFinished = true
			pillowAction.play()
		}

		if (!pillow && prevPillow) {
			pillowAction.stop()
			pillowAction.reset()
		}

		prevPillow = pillow
	})
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then model}

		{#await textures[material] then tex}
			<T.Mesh
				castShadow
				receiveShadow
				geometry={model.nodes.chair_body.geometry}
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

		<!-- animated pillow cloth only -->
		<T.Mesh
			castShadow
			receiveShadow
			geometry={model.nodes.Pillow_Cloth.geometry}
			material={model.nodes.Pillow_Cloth.material}
			morphTargetDictionary={model.nodes.Pillow_Cloth.morphTargetDictionary}
			morphTargetInfluences={model.nodes.Pillow_Cloth.morphTargetInfluences}
			position={[-0.44, 1.91, 0.35]}
			rotation={[-0.13, 0.62, -1.19]}
			scale={0.5}
			visible={pillow}
		/>

		{#if baseStyle === 'pedestal'}
			<T.Mesh
				castShadow
				receiveShadow
				geometry={model.nodes.pedestal_chair_stand.geometry}
				material={model.materials['Stand.001']}
				position={[0, 0.75, 0]}
				scale={0.09}
			/>
		{:else if baseStyle === 'rotating'}
			<T.Mesh
				castShadow
				receiveShadow
				geometry={model.nodes.rotating_chair_stand.geometry}
				material={model.nodes.rotating_chair_stand.material}
				position={[0.08, 0.05, 0]}
				rotation={[-Math.PI, 1.3, -Math.PI]}
				scale={1.21}
			/>
		{/if}
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>