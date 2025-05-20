<template>
  <div class="w-full h-full">
    <Card class="flex flex-col w-full h-full">
      <CardHeader class="flex">
        <div class="flex items-center justify-between w-full">
          <CardTitle>
              Solar Panel Monitoring
          </CardTitle>
          <SelectSolarPlant :items="selectPlants"/>
        </div>
      </CardHeader>
      <CardContent class="flex flex-1">
        <!-- Card content -->
        <div class="flex w-full gap-4 h-full">
          <!-- Left side -->
          <div class="flex flex-col w-full lg:w-1/2 justify-between h-full">
            <!-- Top row left side -->
            <div class="flex flex-1 gap-2">
              <SolarPanelMonitoringFields :name="'Status'" :value="'Active'"/>
              <SolarPanelMonitoringFields :name="'Capacity'" :value="'320'" :unit="'kWh'"/>
              <SolarPanelMonitoringFields :name="'Yield'" :value="'190'" :unit="'kWh'"/>
            </div>
            <div class="flex flex-1 gap-2 mt-2">
              <SolarPanelMonitoringFields :name="'Consumption'" :value="'250'" :unit="'kWh'"/>
              <SolarPanelMonitoringFields :name="'Total Charging'" :value="'100,90'" :unit="'kWh'"/>
            </div>
            <div class="flex flex-1 mt-2">
              <SolarPanelMonitoringFields :name="'Real Time Power Usage'" :value="'100,90'" :unit="'kWh'"/>
            </div>
          </div>
          <div class="flex flex-col w-1/2"> 
            <SelectSolarPanel class="w-fit" :items="selectPanels"/>
            <div class="flex flex-col flex-1 py-4 gap-4 justify-between">
                <SolarPanelMonitoringIndividialInfo :iconName="'ph:battery-charging-vertical'" 
                :featureName="'Efficiency'" :featureValue="'66 %'" :feature-color="'text-green-500'"/>
                
                <SolarPanelMonitoringIndividialInfo :iconName="'ph:sun'" 
                :featureName="'Irradiance'" :featureValue="'820 W/m²'"/>
               
                <SolarPanelMonitoringIndividialInfo :iconName="'mi:temperature'" 
                :featureName="'Temperature'" :featureValue="'46 °C'"/>
               
                <SolarPanelMonitoringIndividialInfo :iconName="'lsicon:lightning-outline'" 
                :featureName="'Voltage'" :featureValue="'39,4 V'"/>
              <div class="flex flex-col">
                <span class="text-gray-500">
                  Output Share
                </span>
                <Progress v-model="progress" class="w-full" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
const progress = ref(13)

watchEffect((cleanupFn) => {
  const timer = setTimeout(() => progress.value = 66, 500)
  cleanupFn(() => clearTimeout(timer))
})

const selectPanels = ref([
  {
    id: 1,
    name: 'Panel 1',
  },
  {
    id: 2,
    name: 'Panel 2',
  },
  {
    id: 3,
    name: 'Panel 3',
  },
])

const selectPlants= ref([
  {
    id: 1,
    name: 'Plant 1',
  },
  {
    id: 2,
    name: 'Plant 2',
  },
  {
    id: 3,
    name: 'Plant 3',
  },
])
</script>

<style>

</style>