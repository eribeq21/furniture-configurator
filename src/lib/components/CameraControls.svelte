<script>
	import { useThrelte, useTask } from '@threlte/core';
	import { config } from '$lib/stores/configurator.svelte.js';
	import { Vector3 } from 'three';

	const { camera } = useThrelte();

	const current = new Vector3(4, 3, 4);
	const target = new Vector3(4, 3, 4);
	let animating = false;

	let zoomVelocity = 0;
	let rotateVelocity = 0;
	const DAMPING = 0.88;
	const ZOOM_FORCE = 0.04;
	const ROTATE_FORCE = 0.008;
	const chairTarget = new Vector3(0, -0.2, 0);

	// watch for preset changes and trigger animation
	$effect(() => {
		const [x, y, z] = config.cameraPosition;
		target.set(x, y, z);
		animating = true;
	});

	useTask(() => {
		const cam = camera.current;

		// preset animation — only runs when animating flag is true
		if (animating) {
			const distance = current.distanceTo(target);
			if (distance > 0.01) {
				current.lerp(target, 0.08);
				cam.position.copy(current);
				cam.lookAt(0, 0, 0);
				return;
			} else {
				// arrived — stop
				current.copy(target);
				cam.position.copy(target);
				cam.lookAt(0, 0, 0);
				animating = false;
			}
		} // momentum zoom
		if (Math.abs(zoomVelocity) > 0.0001) {
			const dist = cam.position.distanceTo(chairTarget);
			if ((zoomVelocity > 0 && dist > 3.2) || (zoomVelocity < 0 && dist < 9.8)) {
				const dir = new Vector3().subVectors(chairTarget, cam.position).normalize();
				cam.position.addScaledVector(dir, zoomVelocity);
			}
			zoomVelocity *= DAMPING;
		}

		// momentum rotate
		if (Math.abs(rotateVelocity) > 0.0001) {
			const angle = rotateVelocity;
			const x = cam.position.x * Math.cos(angle) + cam.position.z * Math.sin(angle);
			const z = -cam.position.x * Math.sin(angle) + cam.position.z * Math.cos(angle);
			cam.position.x = x;
			cam.position.z = z;
			cam.lookAt(chairTarget);
			rotateVelocity *= DAMPING;
		}

		current.copy(cam.position);
	});

	function zoomIn() {
		zoomVelocity += ZOOM_FORCE;
	}
	function zoomOut() {
		zoomVelocity -= ZOOM_FORCE;
	}
	function rotateLeft() {
		rotateVelocity += ROTATE_FORCE;
	}
	function rotateRight() {
		rotateVelocity -= ROTATE_FORCE;
	}

	$effect(() => {
		config.zoomIn = zoomIn;
		config.zoomOut = zoomOut;
		config.rotateLeft = rotateLeft;
		config.rotateRight = rotateRight;
	});
</script>
