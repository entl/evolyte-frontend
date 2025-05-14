<template>
  <div class="flex gap-4 dark:bg-gray-900 bg-secondary p-4 rounded-lg">
    <div class="flex">
      <Icon name="hugeicons:solar-panel-01" class="h-16 w-16 text-yellow-500" />
    </div>
    <div class="flex flex-col w-full gap-1">
      <!-- Plant Name -->
      <div class="flex justify-between">
        <h2 class="text-lg font-semibold">{{ name }}</h2>
        <div class="flex items-center gap-1">
          <Icon name="ph:lightning-fill" class="h-4 w-4 text-yellow-500" />
          {{ energyGenerated }} kWh
        </div>
      </div>
      <!-- Plant Information -->
      <div class="flex text-gray-500 gap-1">
        <span> Capacity {{ capacity }} kWh - </span>
        <span :class="{
          'text-red-500': status === 'Inactive',
          'text-orange-500': status === 'Charging',
          'text-green-500': status === 'Active'
        }">
          {{status}}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  energyGenerated: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    validator: (value: string) => ['Inactive', 'Charging', 'Active'].includes(value)
  },
})
</script>

<style>
</style>
