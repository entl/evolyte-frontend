<template>
  <LMarker :lat-lng="[lat, lon]">
    <LIcon class-name="flex flex-col items-center bg-none">
      <div
          class="flex items-center justify-center rounded-full border border-black"
          :class="bgColor"
          :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.max(12, size / 3)}px` }"
      >
        <p class="text-black font-bold">{{ count }}</p>
      </div>
    </LIcon>
  </LMarker>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Props for cluster data
const props =  defineProps<{
  lat: number;
  lon: number;
  count: number;
}>();

const count = props.count;

// Compute the background color based on count
const bgColor = computed(() => {
  if (count > 1000) return "bg-red-500"; // Red for >1000
  if (count > 500) return "bg-orange-500"; // Orange for >500
  if (count > 100) return "bg-yellow-500"; // Yellow for >100
  return "bg-green-500"; // Green for <=100
});

// Compute the size dynamically (min 24px, max 80px)
const size = computed(() => Math.min(40 + count / 50, 80));
</script>