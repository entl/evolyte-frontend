<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { toast } from "~/components/ui/toast";
import { CalendarDate, type DateValue, isEqualMonth } from '@internationalized/date'
import { useSolarForecast } from "~/composables/useSolarForecast";
import { useGeolocation } from "@vueuse/core";
import { useWeather } from "~/composables/useWeather";
import type { WeatherRequest, WeatherResponse } from "~/types/weather";
import type SolarPredictionForm from "~/types/solarPredictionForm";
import type AggregatedSolarData from "~/types/aggregatedSolarData";
import { formatDecimalPoints } from "~/utils/formatDecimalPoints";

const { solarForecast, fetchSolarForecast, isLoading } = useSolarForecast();
const { coords, locatedAt, error, resume, pause } = useGeolocation();
const { weatherData: currentWeatherData, fetchWeather: fetchCurrentWeather } = useWeather();
const { weatherData: formWeatherData, fetchWeather: fetchFormWeather } = useWeather();

const today = new Date();
const form = reactive<SolarPredictionForm>({
  lat: 0,
  lon: 0,
  kwp: null,
  tilt: null,
  azimuth: null,
  kwh_price: null,
  loss: 0,
  dateRange: {
    start: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()),
    end: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate() + 1)
  }
});

watchEffect(() => {
  if (
    coords.value.latitude &&
    coords.value.longitude &&
    coords.value.latitude !== Infinity &&
    coords.value.longitude !== Infinity
  ) {
    form.lat = formatDecimalPoints(coords.value.latitude, 5);
    form.lon = formatDecimalPoints(coords.value.longitude, 5);
  }
});

watchEffect(async () => {
  const weatherRequest: WeatherRequest = {
    latitude: 0,
    longitude: 0,
    azimuth: 0,
    tilt: 0,
    start_date: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).toString(),
    end_date: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).toString()
  };

  if (form.lon && form.lat) {
    weatherRequest.latitude = form.lat;
    weatherRequest.longitude = form.lon;
    await fetchCurrentWeather(weatherRequest);
  }
});

const validateForm = (): boolean => {
  const missingFields = [];

  if (!form.lat || !form.lon) missingFields.push('Location (Click on the map)');
  if (!form.kwp) missingFields.push('Capacity (kWp)');
  if (!form.tilt) missingFields.push('Tilt');
  if (!form.azimuth) missingFields.push('Azimuth');
  if (!form.dateRange.start || !form.dateRange.end) missingFields.push('Date Range');

  if (missingFields.length > 0) {
    toast({
      title: 'Error',
      description: `Missing fields: ${missingFields.join(', ')}`,
      variant: 'destructive'
    });
    return false;
  }
  return true;
};

const aggregatedSolarData = ref<AggregatedSolarData>({
  expectedEnergy: {
    actual: 0,   // Predicted energy production in kWh
    maxTheoretical: 100, // Theoretical maximum possible in kWh
  },
  peakSolarHours: {
    actual: 0,  // Measured or predicted peak sunlight duration in hours
    maxTheoretical: 100, // Theoretical max based on location and season
  },
  averageIrradiance: {
    actual: 0, // Average irradiance in W/m²
    maxTheoretical: 100, // Maximum possible under ideal conditions
  },
  cloudCoverPercentage: {
    actual: 0, // Measured cloud cover in %
    maxTheoretical: 100, // Typically 100% (fully overcast sky)
  },
});

// Submit Form
const onSubmitForm = async () => {
  console.log('Submitting form', form);
  if (!validateForm()) return;
  await fetchSolarForecast(form);
  await fetchFormWeather({
    latitude: form.lat,
    longitude: form.lon,
    azimuth: form.azimuth,
    tilt: form.tilt,
    start_date: form.dateRange.start.toString(),
    end_date: form.dateRange.end.subtract({ days: 1 }).toString()
  });
  await nextTick();

  aggregatedSolarData.value = calculateAggregatedSolarData(
    formWeatherData.value,
    solarForecast.value,
    form.kwp
  );
};

const co2SavedForPeriod = () => {
  if (!solarForecast.value) return 0;

  return formatDecimalPoints(
    solarForecast.value.reduce((acc, curr) => acc + curr.co2_saved, 0),
    2
  );
};

const moneySavedForPeriod = () => {
  if (!solarForecast.value) return 0;

  return formatDecimalPoints(
    solarForecast.value.reduce((acc, curr) => acc + curr.money_saved, 0),
    2
  );
};

onMounted(() => resume())
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <header class="w-full py-4 px-8 flex justify-between items-center shadow-md border-b bg-background">
      <Logo></Logo>
      <div class="flex items-center space-x-4">
        <Button>Register</Button>
        <Button>Sign In</Button>
        <ColorModeButton />
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-col lg:flex-row gap-4 p-6 flex-1 overflow-auto">
      <!-- Left Section: Map & Analytics -->
      <div class="flex flex-col flex-1 space-y-4">
        <!-- Map Section -->
        <div class="rounded-lg shadow-lg min-h-[250px] h-[50vh] w-full">
          <MapView
            :lat="form.lat"
            :lon="form.lon"
            @update:location="(val) => {
              form.lat = formatDecimalPoints(val.lat, 5);
              form.lon = formatDecimalPoints(val.lon, 5);
            }"
            class="h-full w-full"
          />
        </div>

        <!-- Analytics and Aggregated Solar Data-->
        <div class="flex flex-col lg:flex-row gap-4 flex-1">
          <!-- Graph Card -->
          <ForecastChart class="flex-[3]" :forecast-data="solarForecast" />
          <div class="flex flex-1 lg:flex-none 2xl:hidden">
            <AggregatedSolarData :data="aggregatedSolarData" />
          </div>
        </div>
      </div>

      <!-- Right Section: Settings Panel -->
      <div class="flex flex-col w-full lg:w-[30%] gap-4">
        <ParametersForm v-model:form="form" @submit-form="onSubmitForm" />
        <!-- Weather Section -->
        <WeatherWidget class="flex-grow" :weather-data="currentWeatherData" />

        <div class="hidden 2xl:block">
          <AggregatedSolarData :data="aggregatedSolarData" :cols="4" />
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card class="shadow-lg">
            <CardTitle class="pt-4 px-4 text-sm font-medium">
              <h2 class="text-lg font-semibold">CO2 Saved</h2>
            </CardTitle>
            <CardContent class="flex items-center p-4 text-green-500 dark:text-green-400">
              <p class="text-2xl font-semibold 2xl:text-4xl">
                {{ co2SavedForPeriod() }} KGs
              </p>
            </CardContent>
          </Card>

          <Card class="shadow-lg">
            <CardTitle class="pt-4 px-4">
              <h2 class="text-lg font-semibold">Money Saved</h2>
            </CardTitle>
            <CardContent class="p-4 text-primary">
              <p class="text-2xl font-semibold 2xl:text-4xl">
                £{{ moneySavedForPeriod() }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  </div>
</template>