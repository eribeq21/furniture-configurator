<script>
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  let { fallback, error, children, ref = $bindable(), seatColor = '#f0ece6', ...props } = $props()

  const gltf = useGltf('/Rotating_Chair_Blender_ITP.glb')
</script>

<T.Group
  bind:ref
  dispose={false}
  {...props}
>
  {#await gltf}
    {@render fallback?.()}
  {:then gltf}
    <T.Mesh
      castShadow
      receiveShadow
      geometry={gltf.nodes.chair_body.geometry}
      position={[0, 2.03, 0]}
    >
      <T.MeshStandardMaterial
        color={seatColor}
        roughness={0.85}
        metalness={0}
      />
    </T.Mesh>

    <T.Mesh
      castShadow
      receiveShadow
      geometry={gltf.nodes.Cylinder.geometry}
      material={gltf.nodes.Cylinder.material}
      position={[0, 0.76, 0]}
      scale={0.08}
    />

    <T.Mesh
      castShadow
      receiveShadow
      geometry={gltf.nodes.Cylinder003.geometry}
      material={gltf.nodes.Cylinder003.material}
      position={[0.08, 0.05, 0]}
      rotation={[-Math.PI, 1.3, -Math.PI]}
      scale={1.21}
    />
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>