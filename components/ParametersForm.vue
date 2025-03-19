<template>
  <Card class="shadow-lg">
    <CardContent class="p-4">
      <h2 class="text-lg font-semibold">Parameters</h2>
      <p class="text-muted-foreground">Insert information about solar panel</p>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label for="lat">Latitude</Label>
          <Input
              class="mt-1 appearance-none"
              id="lat"
              v-model="localForm.lat"
              placeholder="Click on map"
              type="number"
          />
        </div>
        <div>
          <Label for="lon">Longitude</Label>
          <Input
              class="mt-1 appearance-none"
              id="lon"
              v-model="localForm.lon"
              placeholder="Click on map"
              type="number"
          />
        </div>
        <div>
          <Label for="kwp">Capacity (kWp)</Label>
          <Input
              class="mt-1"
              id="kwp"
              v-model="localForm.kwp"
              placeholder="0.1"
              min="0.1"
              type="number"
          />
        </div>
        <div>
          <Label for="kwh_price">KWH Price</Label>
          <Input
              class="mt-1"
              id="kwh_price"
              v-model="localForm.kwhPrice"
              placeholder="0.25"
              min="0"
              type="number"
          />
        </div>
        <div>
          <Label for="tilt">Tilt</Label>
          <Input
              class="mt-1"
              id="tilt"
              v-model="localForm.tilt"
              placeholder="0-90 (°)"
              type="number"
              min="0"
              max="90"
          />
        </div>
        <div>
          <Label for="azimuth">Azimuth</Label>
          <Input
              class="mt-1"
              id="azimuth"
              v-model="localForm.azimuth"
              placeholder="0-360 (°)"
              type="number"
              min="0"
              max="360"
          />
        </div>
      </div>

      <div class="flex justify-center items-center mt-4 w-full">
        <div class="flex flex-col items-center">
          <Label for="dateRange">Date Range</Label>
          <DateRangePicker v-model="localForm.dateRange" />
        </div>
      </div>

      <Button class="w-full mt-4" @click="onSubmitForm">
        Generate Forecast
      </Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, watch } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from 'reka-ui'
import { Button } from '@/components/ui/button'
import DateRangePicker from '@/components/ui/range-calendar/DateRangePicker.vue'
import type SolarPredictionForm from "~/types/solarPredictionForm";

const props = defineProps<{ form: any }>()

// emit events to update the parent component
const emits = defineEmits<{
  (e: 'update:form', updatedForm: any): void
  (e: 'submit-form'): void
}>()

const localForm = reactive<SolarPredictionForm>(props.form)

watch(localForm, (newVal) => {
  emits('update:form', newVal)
}, { deep: true })

const onSubmitForm = () => {
  emits('submit-form')
}
</script>