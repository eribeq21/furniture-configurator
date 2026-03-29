<script>
	import { useThrelte, useTask } from '@threlte/core';
	import { config } from '$lib/stores/configurator.svelte.js';
	import { Vector3 } from 'three';

	const { camera } = useThrelte();

	const current = new Vector3(4, 3, 4);
	const target = new Vector3(4, 3, 4);

	let animating = false;

	useTask(() => {
		const [tx, ty, tz] = config.cameraPosition;
		target.set(tx, ty, tz);

		const distance = current.distanceTo(target);

		if (distance > 0.01) {
			animating = true;
			current.lerp(target, 0.08);
			camera.current.position.copy(current);
			camera.current.lookAt(0, 0, 0);
		} else if (animating) {
			current.copy(target);
			camera.current.position.copy(target);
			camera.current.lookAt(0, 0, 0);
			animating = false;
		}
	});
</script>
