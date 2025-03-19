<template>
  <Card class="h-full shadow-lg">
    <CardTitle class="flex p-4">Aggregated Solar Data</CardTitle>
    <CardContent class="flex h-full p-4">
      <!-- Explicit Tailwind Classes via Map -->
      <div class="grid w-full h-full justify-between mt-4" :class="gridColsClass">
        <!-- Dynamic Circular Indicators -->
        <div v-for="(metric, index) in progressMetrics" :key="index" class="flex flex-col items-center mx-2 text-center">
          <svg class="w-full h-full max-w-[120px] max-h-[120px] lg:max-h-[65px] lg:max-w-[65px] 2xl:max-h-[120px] 2xl:max-w-[120px]" viewBox="0 0 36 36">
            <!-- Background Circle -->
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-gray-300 dark:stroke-gray-600" stroke-width="4" />
            <!-- Foreground Circle for Progress -->
            <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                :class="metric.colorClass"
                stroke-width="4"
                stroke-dasharray="100, 100"
                :stroke-dashoffset="100 - metric.percentage"
                stroke-linecap="round"
                transform="rotate(-90 18 18)"
            />
          </svg>
          <p class="text-lg font-semibold">{{ metric.value }} {{ metric.unit }}</p>
          <p class="text-xs text-muted-foreground">{{ metric.label }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import type AggregatedSolarData from '~/types/aggregatedSolarData';

const props = defineProps<{
  data: AggregatedSolarData;
  cols?: number; // Number of columns in the grid
}>();

// Fix: Explicitly map grid class names instead of relying on dynamic string generation
const gridColsClass = computed(() => {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  };
  return gridClasses[props.cols ?? 2] || "grid-cols-2"; // Default to 2 columns if invalid value
});

// Calculate the percentage of theoretical max
const progressMetrics = computed(() => [
  {
    label: 'Expected Energy',
    value: props.data.expectedEnergy.actual.toFixed(2),
    unit: 'kWh',
    percentage: (props.data.expectedEnergy.actual / props.data.expectedEnergy.maxTheoretical) * 100,
    colorClass: 'stroke-green-500 dark:stroke-green-400'
  },
  {
    label: 'Peak Solar Hours',
    value: props.data.peakSolarHours.actual,
    unit: 'hrs',
    percentage: (props.data.peakSolarHours.actual / props.data.peakSolarHours.maxTheoretical) * 100,
    colorClass: 'stroke-yellow-500 dark:stroke-yellow-400'
  },
  {
    label: 'Avg Irradiance',
    value: props.data.averageIrradiance.actual.toFixed(1),
    unit: 'W/m²',
    percentage: (props.data.averageIrradiance.actual / props.data.averageIrradiance.maxTheoretical) * 100,
    colorClass: 'stroke-red-500 dark:stroke-red-400'
  },
  {
    label: 'Cloud Cover',
    value: props.data.cloudCoverPercentage.actual.toFixed(1),
    unit: '%',
    percentage: (props.data.cloudCoverPercentage.actual / props.data.cloudCoverPercentage.maxTheoretical) * 100,
    colorClass: 'stroke-blue-500 dark:stroke-blue-400'
  }
]);
</script>