<script>
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  let { fallback, error, children, ref = $bindable(), ...props } = $props()

  const gltf = useGltf('real_furniture.glb')
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
      geometry={gltf.nodes.Cylinder.geometry}
      material={gltf.materials.Stand}
      position={[0, 0.77, 0]}
      scale={0.09}
    >
      <T.Mesh
        castShadow
        receiveShadow
        geometry={gltf.nodes.Cube.geometry}
        material={gltf.nodes.Cube.material}
        position={[0, 13.85, 0]}
        scale={10.87}
      />
    </T.Mesh>
  {:catch err}
    {@render error?.({ error: err })}
  {/await}

  {@render children?.({ ref })}
</T.Group>
