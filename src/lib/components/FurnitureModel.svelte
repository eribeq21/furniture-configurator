<script>
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'

  let { fallback, error, children, ref = $bindable(), ...props } = $props()

  const gltf = useGltf('/real_furniture.glb')
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
      material={gltf.nodes.chair_body.material}
      position={[0, 2.03, 0]}
    />
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
