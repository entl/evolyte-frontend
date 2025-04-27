<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import createGlobe from 'cobe'
import type { COBEOptions } from 'cobe'

const props = defineProps<{
  config?: COBEOptions
}>()

const EUROPE_MARKERS = [
  { location: [52.5200,  13.4050], size: 0.06 }, // Berlin
  { location: [48.8566,   2.3522], size: 0.05 }, // Paris
  { location: [40.4168,  -3.7038], size: 0.05 }, // Madrid
  { location: [41.9028,  12.4964], size: 0.06 }, // Rome
  { location: [52.3676,   4.9041], size: 0.04 }, // Amsterdam
  { location: [50.0755,  14.4378], size: 0.04 }, // Prague
  { location: [48.2082,  16.3738], size: 0.04 }, // Vienna
  { location: [59.3293,  18.0686], size: 0.05 }, // Stockholm
  { location: [37.9838,  23.7275], size: 0.05 }, // Athens
  { location: [53.3498,  -6.2603], size: 0.04 }, // Dublin

  // ─── New UK entries ─────────────────────────────
  { location: [51.5074,  -0.1278], size: 0.06 }, // London
  { location: [52.2053,   0.1218], size: 0.05 }, // Cambridge
]

// default config, just like your React version
const DEFAULT_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  phi: 0,
  theta: 0.3,
  devicePixelRatio: 2,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1,1,1],
  markerColor: [251/255,100/255,21/255],
  glowColor: [1,1,1],
  markers: [
    ...EUROPE_MARKERS
  ]
}

const canvasRef = ref<HTMLCanvasElement>()
const pointerDownX = ref<number|null>(null)
const dragDelta = ref(0)
const r = ref(0)
let globe: ReturnType<typeof createGlobe>
let phi = 0
let width = 0

function updateCursor(isDown: boolean) {
  if (canvasRef.value) {
    canvasRef.value.style.cursor = isDown ? 'grabbing' : 'grab'
  }
}

function onPointerDown(event: PointerEvent) {
  pointerDownX.value = event.clientX - dragDelta.value
  updateCursor(true)
}

function onPointerUp() {
  pointerDownX.value = null
  updateCursor(false)
}

function onPointerMove(event: PointerEvent) {
  if (pointerDownX.value !== null) {
    const delta = event.clientX - pointerDownX.value
    dragDelta.value = delta
    r.value = delta / 200
  }
}

function onTouchMove(event: TouchEvent) {
  if (pointerDownX.value !== null && event.touches[0]) {
    const delta = event.touches[0].clientX - pointerDownX.value
    dragDelta.value = delta
    r.value = delta / 200
  }
}

function onResize() {
  if (canvasRef.value) {
    width = canvasRef.value.offsetWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()

  const cfg = props.config || DEFAULT_CONFIG

  globe = createGlobe(canvasRef.value!, {
    ...cfg,
    width: width * 2,
    height: width * 2,
    onRender(state) {
      if (pointerDownX.value === null) {
        phi += 0.005
      }
      state.phi = phi + r.value
      state.width = width * 2
      state.height = width * 2
    },
  })

  // fade in
  setTimeout(() => {
    if (canvasRef.value) canvasRef.value.style.opacity = '1'
  })

  canvasRef.value!.addEventListener('pointerdown', onPointerDown)
  canvasRef.value!.addEventListener('pointerup', onPointerUp)
  canvasRef.value!.addEventListener('pointerout', onPointerUp)
  canvasRef.value!.addEventListener('pointermove', onPointerMove)
  canvasRef.value!.addEventListener('touchmove', onTouchMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  globe.destroy()
})
</script>

<template>
  <div class="relative w-[800px] h-[800px]">
    <canvas
      ref="canvasRef"
      class="w-full h-full opacity-0 transition-opacity duration-500"
    />
  </div>
</template>

<style scoped>
/* You can add any additional styling here */
</style>
