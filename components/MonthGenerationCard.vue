<template>
  <div class="flex flex-col w-full h-full rounded-lg py-2" :class="isCurrentMonth ? 'bg-primary' : 'dark:bg-gray-900 bg-secondary'">
    <!-- Month -->
    <div class="text-center text-md font-light" :class="isCurrentMonth ? 'text-foreground' : 'text-gray-500'">
      <span>{{ month }}</span>
    </div>
    <!-- Weather Icon -->
    <div class="flex justify-center">
      <img :src="image" />
    </div>
    <div class="text-center text-md font-light" :class="isCurrentMonth ? 'text-foreground' : 'text-gray-500'">
      {{ generation }} kWh
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  month: {
    type: String,
    required: true
  },
  generation: {
    type: Number,
    required: true
  },
  isCurrentMonth: {
    type: Boolean,
    required: true
  },
  weatherCode: {
    type: Number,
    required: true
  }
})

const {description, image} = mapWeatherCodeToCondition(props.weatherCode, 1)

console.log(description, image)

</script>

<style>

</style>