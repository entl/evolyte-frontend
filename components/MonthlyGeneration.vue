<template>
  <div class="w-full h-full">
    <Card class="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle>
          Montly Generation
        </CardTitle>
        <CardDescription>
          Updated 10 minutes ago
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col flex-1">
        <div class="flex flex-1 gap-4">
          <MonthGenerationCard v-for="(item, index) in data" :key="index" :month="item.month" :generation="item.generation" :is-current-month="item.isCurrentMonth" :weather-code="item.weatherCode" />
        </div>
        <div class="flex flex-1 flex-col mt-6 justify-between">
          <!-- Max used -->
          <div class="flex justify-between text-gray-500">
            <div>
              Maximal Used
            </div>
            <div class="flex">
              October 301 kWh
            </div>
          </div>
          <!-- Min used -->
          <div class="flex justify-between text-gray-500">
            <div>
              Minimal Used
            </div>
            <div class="flex">
              December 125 kWh
            </div>
          </div>
          <!-- Total used -->
           <div class="flex justify-between text-md font-light text-gray-500">
            <div>
              Total Used
            </div>
            <div class="flex">
              500 kWh
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
const data = ref([
  {
    month: 'Jan',
    generation: 100,
    isCurrentMonth: true,
    weatherCode: 1
  },
  {
    month: 'Feb',
    generation: 200,
    isCurrentMonth: false,
    weatherCode: 73
  },
  {
    month: 'Mar',
    generation: 300,
    isCurrentMonth: false,
    weatherCode: 63
  },
  {
    month: 'Apr',
    generation: 400,
    isCurrentMonth: false,
    weatherCode: 45
  }
])
</script>

<style>

</style>