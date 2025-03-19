<template>
  <Card class="h-full flex flex-col shadow-lg">
    <CardTitle class="pt-4 px-4">
      <h2 class="text-lg font-semibold">Forecasted Energy Production</h2>
    </CardTitle>
    <div class="flex-1 h-full">
      <LineChart
          class="h-full w-full"
          :data="chartData"
          index="datetime"
          :categories="['Prediction', 'CO2 Saved']"
          :y-formatter="formatYTick"
      />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Card, CardTitle } from '@/components/ui/card'
import { LineChart } from '~/components/ui/chart-line'
import type {PredictionResponse} from "~/types/prediction";

// Props from parent
const props = defineProps<{
  forecastData: PredictionResponse[] | []
}>()

const chartData = computed(() => {
  return props.forecastData.map((data) => {
    return {
      datetime: data.datetime,
      Prediction: Math.round(data.prediction * 10000)/10000,
      "CO2 Saved": Math.round(data.co2_saved * 10000)/10000
    }
  })
})

function formatYTick(tick: number) {
  return `${new Intl.NumberFormat('en-US').format(tick)} kWh`
}
</script>