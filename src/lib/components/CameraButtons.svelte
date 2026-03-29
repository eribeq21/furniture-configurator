<script>
	import { ZoomIn, ZoomOut, RotateCcw, RotateCw } from 'lucide-svelte';

	let { zoomIn, zoomOut, rotateLeft, rotateRight } = $props();

	let holdInterval = null;

	function startHold(action) {
		action();
		holdInterval = setInterval(action, 16);
	}

	function stopHold() {
		clearInterval(holdInterval);
		holdInterval = null;
	}

	const btnClass =
		'group flex items-center justify-center rounded-full border border-white/20 bg-white/70 p-3 shadow-lg backdrop-blur-xl transition hover:bg-white/90';
	const iconClass = 'h-6 w-6 text-gray-700 transition group-hover:text-black';
</script>

<div class="flex flex-col gap-2">
	<button
		class={btnClass}
		title="Zoom in"
		onmousedown={() => startHold(zoomIn)}
		onmouseup={stopHold}
		onmouseleave={stopHold}
		ontouchstart={() => startHold(zoomIn)}
		ontouchend={stopHold}
	>
		<ZoomIn class={iconClass} />
	</button>

	<button
		class={btnClass}
		title="Zoom out"
		onmousedown={() => startHold(zoomOut)}
		onmouseup={stopHold}
		onmouseleave={stopHold}
		ontouchstart={() => startHold(zoomOut)}
		ontouchend={stopHold}
	>
		<ZoomOut class={iconClass} />
	</button>

	<button
		class={btnClass}
		title="Rotate left"
		onmousedown={() => startHold(rotateLeft)}
		onmouseup={stopHold}
		onmouseleave={stopHold}
		ontouchstart={() => startHold(rotateLeft)}
		ontouchend={stopHold}
	>
		<RotateCcw class={iconClass} />
	</button>

	<button
		class={btnClass}
		title="Rotate right"
		onmousedown={() => startHold(rotateRight)}
		onmouseup={stopHold}
		onmouseleave={stopHold}
		ontouchstart={() => startHold(rotateRight)}
		ontouchend={stopHold}
	>
		<RotateCw class={iconClass} />
	</button>
</div>
