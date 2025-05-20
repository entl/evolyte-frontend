<template>
  <!-- Only render card if we have valid hourly data -->
  <Card v-if="weatherDataHourly" class="relative shadow-lg overflow-hidden h-full min-h-[150px]">
    <!-- Background Image -->
    <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${weatherBackground})` }"
    ></div>

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <CardContent class="relative p-4 text-white">
      <!-- City Name -->
      <h2 class="text-sm font-semibold">{{ cityName }}</h2>

      <div class="flex justify-between items-center mt-2">
        <div class="flex flex-col">
          <p class="text-4xl font-bold">{{ weatherDataHourly.temperature_2m }}°C</p>
          <!-- Safely handle cloud_cover or show 'Clear' if undefined -->
          <p class="text-lg">{{ weatherCondition.description}}</p>
        </div>
        <div class="flex flex-col items-end text-xs opacity-90 space-y-1">
          <div class="flex items-center gap-1">
            <Icon name="wi:humidity" class="text-blue-300" size="36"/>
            <p class="text-lg font-medium text-blue-200"> {{ weatherDataHourly.relative_humidity_2m }}%</p>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="wi:strong-wind" class="text-gray-300" size="36"/>
            <p class="text-lg font-medium text-gray-200"> {{ weatherDataHourly.wind_speed_10m }} MPH</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Fallback if weather data not yet loaded -->
  <Card v-else class="relative shadow-lg overflow-hidden h-64 md:h-1/2 min-h-[150px]">
    <CardContent class="p-4 text-center">
      <h2 class="text-sm font-semibold">Loading Weather...</h2>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type {HourlyWeatherData, WeatherCondition, WeatherResponse } from '@/types/api/weather'
import { WeatherGroupBackgrounds } from '~/types/api/weather'
import { fetchCityName } from '@/utils/geo'
import mapWeatherCodeToCondition from "@/utils/mapWeatherCodeToCondition";

const props = defineProps<{
  weatherData: WeatherResponse | null
}>()

// local refs for city name and hourly weather
const cityName = ref<string>('')
const weatherCondition = ref<WeatherCondition>()
const weatherBackground = ref<string>('')
const weatherDataHourly = ref<HourlyWeatherData | null>(null)

// watch for changes reactively
watchEffect(() => {
  // set local refs
  if (props.weatherData && props.weatherData.hourly && props.weatherData.hourly.length) {
    // get current weather
    const now = new Date();
    now.setMinutes(0, 0, 0); // Round to the hour

    // closest matching hourly entry
    const closestWeather = props.weatherData.hourly.find((hour) => {
      return new Date(hour.time).getTime() === now.getTime();
    });
    weatherDataHourly.value = closestWeather ?? props.weatherData.hourly[0];

    const weatherGroup = getWeatherGroup(weatherDataHourly.value.weather_code)
    weatherBackground.value = WeatherGroupBackgrounds[weatherGroup]

    // fetch city name
    fetchCityName(props.weatherData.latitude, props.weatherData.longitude)
        .then((name) => {
          cityName.value = name ?? ''
        })
        .catch((err) => {
          console.error('Failed to fetch city name:', err)
        })

    weatherCondition.value = mapWeatherCodeToCondition(weatherDataHourly.value.weather_code, weatherDataHourly.value.is_day)
  } else {
    weatherDataHourly.value = null
    cityName.value = ''
  }
})
</script>

<style>

</style>