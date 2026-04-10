<script>
	import { tick } from 'svelte';
	import { useThrelte } from '@threlte/core';
	import { config } from '$lib/stores/configurator.svelte.js';

	const { canvas, renderer, scene, camera, invalidate } = useThrelte();

	const nextFrame = () =>
		new Promise((resolve) => {
			requestAnimationFrame(() => resolve());
		});

	function buildFilename() {
		const slug = [
			'lounge-chair',
			config.selectedModel,
			config.material,
			config.colorName,
			config.standColorName
		]
			.join('-')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');

		return `${slug || 'chair-config'}.png`;
	}

	async function exportPng() {
		if (config.isExportingPng) return;

		config.isExportingPng = true;

		try {
			invalidate();
			await tick();
			await nextFrame();

			renderer.render(scene, camera.current);

			const blob = await new Promise((resolve, reject) => {
				if (typeof canvas.toBlob === 'function') {
					canvas.toBlob((result) => {
						if (result) {
							resolve(result);
							return;
						}

						reject(new Error('PNG export failed.'));
					}, 'image/png');
					return;
				}

				try {
					const dataUrl = canvas.toDataURL('image/png');
					const base64 = dataUrl.split(',')[1];
					const binary = atob(base64);
					const bytes = new Uint8Array(binary.length);

					for (let i = 0; i < binary.length; i += 1) {
						bytes[i] = binary.charCodeAt(i);
					}

					resolve(new Blob([bytes], { type: 'image/png' }));
				} catch (error) {
					reject(error);
				}
			});

			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = buildFilename();
			link.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error(error);
		} finally {
			config.isExportingPng = false;
		}
	}

	$effect(() => {
		config.exportPng = exportPng;

		return () => {
			config.exportPng = async () => {};
		};
	});
</script>
