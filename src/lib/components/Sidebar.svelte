<script>
  import { config } from '$lib/stores/configurator.svelte.js'

  const colors = [
    { hex: '#f0ece6', name: 'Cream' },
    { hex: '#2c2c2a', name: 'Charcoal' },
    { hex: '#534AB7', name: 'Indigo' },
    { hex: '#993C1D', name: 'Rust' },
    { hex: '#1D9E75', name: 'Forest' },
    { hex: '#D4537E', name: 'Rose' },
  ]

  const models = [
    { id: 'furniture', label: 'Furniture' },
    { id: 'rotating-chair', label: 'Rotating Chair' }
  ]

  function selectColor(color) {
    config.seatColor = color.hex
    config.colorName = color.name
  }

  function selectModel(modelId) {
    config.selectedModel = modelId
  }
</script>

<div class="flex h-full flex-col overflow-y-auto">
  <!-- Header -->
  <div class="border-b border-gray-200 px-5 py-4">
    <h2 class="text-sm font-semibold text-gray-900">Lounge Chair</h2>
    <p class="mt-0.5 text-xs text-gray-400">Configure your variant</p>
  </div>

  <!-- Color section -->
  <div class="border-b border-gray-200 px-5 py-4">
    <p class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Fabric color</p>
    <div class="flex flex-wrap gap-2">
      {#each colors as color (color.hex)}
        <button
          onclick={() => selectColor(color)}
          title={color.name}
          class="h-7 w-7 rounded-full border-2 transition-transform hover:scale-110"
          style="background:{color.hex}; border-color: {config.seatColor === color.hex ? '#111' : 'transparent'}; outline: {config.seatColor === color.hex ? '2px solid #111' : 'none'}; outline-offset: 2px"
        ></button>
      {/each}
    </div>
    <p class="mt-2 text-xs text-gray-500">{config.colorName}</p>
  </div>

   <!-- Model section -->
  <div class="border-b border-gray-200 px-5 py-4">
    <p class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Model</p>
    <div class="flex gap-2">
      {#each models as model (model.id)}
        <button
          onclick={() => selectModel(model.id)}
          class={`flex-1 rounded-lg border py-2 text-xs font-medium transition ${
            config.selectedModel === model.id
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {model.label}
        </button>
      {/each}
    </div>
  </div>


  <div class="flex-1"></div>

  <!-- Export panel -->
  <div class="border-t border-gray-200 px-5 py-4">
    <p class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Your config</p>
    <div class="mb-1 flex justify-between text-xs">
      <span class="text-gray-400">Model</span>
      <span class="font-medium text-gray-800">
        {models.find((m) => m.id === config.selectedModel)?.label}
      </span>
    </div>
    <div class="mb-1 flex justify-between text-xs">
      <span class="text-gray-400">Color</span>
      <span class="font-medium text-gray-800">{config.colorName}</span>
    </div>
    <div class="mt-3 flex gap-2">
      <button class="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
        Export PNG
      </button>
      <button class="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
        Share link
      </button>
    </div>
  </div>
</div>