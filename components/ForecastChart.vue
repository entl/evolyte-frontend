<template>
  <Card class="w-full h-full flex flex-col shadow-lg">
    <CardTitle class="pt-4 px-4">
      <h2 class="text-lg font-semibold">Forecasted Energy Production</h2>
    </CardTitle>
    <div class="flex-1 h-full pb-2">
      <LineChart
        class="h-full w-full"
        :data="chartData"
        index="datetime"
        :categories="['Prediction', 'CO2 Saved']"
        :y-formatter="formatYTick"
        :x-formatter="formatXTick"
      />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { Card, CardTitle } from '@/components/ui/card'
import { LineChart } from '~/components/ui/chart-line'
import type { PredictionResponse } from "~/types/prediction"

const props = defineProps<{
  forecastData: PredictionResponse[] | []
}>()

const chartData = computed(() => {
  return props.forecastData.map((data) => ({
    datetime: new Date(data.datetime).toISOString(),
    Prediction: Math.round(data.prediction * 10000) / 10000,
    "CO2 Saved": Math.round((data.co2_saved ?? 0) * 10000) / 10000
  }))
})

function formatYTick(tick: number | Date, i: number, ticks: (number | Date)[]) {
  if (typeof tick === 'number') {
    return `${new Intl.NumberFormat('en-GB').format(tick)} kWh`
  }
  return ''
}

function formatXTick(tick: number | Date, i: number, ticks: (number | Date)[]) {
  if (typeof tick === 'number') {
    const i = Math.round(tick)
    const datetime = props.forecastData[i]?.datetime
    return datetime ? new Date(datetime).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }) : ''
  }
  return ''
}
</script>
