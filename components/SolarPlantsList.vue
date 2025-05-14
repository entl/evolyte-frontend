<template>
  <Card class="w-full h-full">
    <CardHeader>
      <CardTitle>
        Solar Plants List
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col flex-1">
      <div class="flex flex-col gap-4">
        <!-- Plant Card -->
        <SolarPlantEntry v-for="(item, index) in solarPlants" :key="index" :name="item.name" :capacity="item.capacity" :status="item.status" :energy-generated="item.energyGenerated" />
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
const solarPlants = ref([
  {
    name: 'Plant 1',
    capacity: 320,
    status: 'Active',
    energyGenerated: 292.8,
  },
  {
    name: 'Plant 2',
    capacity: 400,
    status: 'Inactive',
    energyGenerated: 205.8,
  },
  {
    name: 'Plant 3',
    capacity: 235,
    status: 'Charging',
    energyGenerated: 103.8,
  }
])
</script>

<style>

</style>