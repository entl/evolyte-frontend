<script setup lang="ts">
import { useUsersApi } from '~/composables/api/useUsersApi';
import { useSolarForecast } from '~/composables/guestApi/useSolarForecast';
import { useUserStore } from '~/storages/userStorage';
definePageMeta({
  middleware: 'auth',
  layout: 'authorised',
})

const usersApi = useUsersApi()
const userStore = useUserStore()
const { solarForecast, fetchSolarForecast, isLoading } = useSolarForecast()


const getCurrentUserDetails = async () => {
  const {data, error} = await usersApi.getCurrentUser()
  if (data) {
    userStore.setUser(data)
  }
}


onMounted(async () => {
  getCurrentUserDetails()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Page heading -->
    <div class="flex px-6 pt-6 gap-2 items-center">
      <SidebarTrigger/>
      <h2 class="text-2xl font-semibold">Overview</h2>
    </div>
    <div class="flex-1 flex">
      <div class="flex flex-col flex-1 gap-4 p-6">
        <!-- Top part -->
        <div class="flex gap-4 flex-1">
          <div class="w-2/3">
            <SolarPanelMonitoring/>
          </div>
          <div class="w-1/3">
            <MonthlyGeneration/>
          </div>
        </div>
        <!-- Bottom part -->
        <div class="flex gap-4 flex-1">
          <div class="w-2/3">
            <EnergyProducedChart :energy-data="solarForecast" />
          </div>
          <div class="w-1/3">
            <SolarPlantsList/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Additional styling if needed */
</style>

