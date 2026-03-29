export const config = $state({
	seatColor: '#f0ece6',
	colorName: 'Cream',
	material: 'cotton',
	selectedModel: 'pedestal',
	pillow: false,
	cameraPosition: [4, 3, 4],

	// camera actions — filled in by ViewControls when it mounts
	zoomIn: () => {},
	zoomOut: () => {},
	rotateLeft: () => {},
	rotateRight: () => {}
});
