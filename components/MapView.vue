<template>
  <div class="h-full w-full relative">
    <div class="absolute bottom-1 right-1 bg-white p-1 rounded-sm z-50 shadow text-xs">
      <label class="flex items-center space-x-1">
        <span class="text-gray-500">Leaflet | © OpenStreetMap contributors</span>
      </label>
    </div>
    <div class="absolute top-1 right-1 bg-white p-1 rounded-sm z-50 shadow text-xs">
      <label class="flex items-center justify-center space-x-2 cursor-pointer">
        <input type="checkbox" @change="onCheckboxChange" v-model="showSolarPanels" />
        <span class="text-black">Show Solar Panels</span>
      </label>
    </div>
    <LMap
        class="h-full w-full z-[0]"
        :bounds="bounds"
        :zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        @click="onMapClick"
        @update:zoom="onZoomChange"
        @update:bounds="onBoundsChange"
    >
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
      />
      <LMarker v-if="lat !== null && lon !== null" :lat-lng="[lat, lon]" />
      <template v-if="showSolarPanels && 12 > zoom">
        <ClusterMarker
            v-if="clusters?.clusters?.length"
            v-for="cluster in clusters.clusters"
            :key="`${cluster.latitude}-${cluster.longitude}`"
            :lat="cluster.latitude"
            :lon="cluster.longitude"
            :count="cluster.count"
            @click="onClusterMarkerClick"
        />
      </template>
      <template v-if="showSolarPanels && 12 <= zoom">
        <LMarker
            v-if="panels?.length"
            v-for="panel in panels"
            :key="`${panel.location[1]}-${panel.location[0]}-${panel.id}`"
            :lat-lng="[panel.location[1], panel.location[0]]"
        >
          <LIcon :icon-url="'/icons/solar-panel.png'" :icon-size="[32, 32]" />
          <LTooltip>
            <p>ID: {{ panel.id }}</p>
            <p>Capacity: {{ panel.capacity_kw }} kW</p>
            <p>Operational Since: {{ panel.installation_date }}</p>
            <p>Location: ({{ panel.location[1] }}, {{ panel.location[0] }})</p>
          </LTooltip>
        </LMarker>
      </template>
    </LMap>
  </div>
</template>

<script setup lang="ts">
import type {ClusteredSolarPanelsResponse,  SolarPanelResponse} from "~/types/api/solarPanels";
import { useSolarPanelsApi } from "~/composables/api/useSolarPanels";


const { getPanelsInBounds, getClusteredSolarPanels } = useSolarPanelsApi()

// state of checkbox
let showSolarPanels = ref(false);
const onCheckboxChange = (e: any) => {
  showSolarPanels.value = e.target.checked
  onBoundsChange(bounds.value)
}

const clusters = ref<ClusteredSolarPanelsResponse>();
const panels = ref<SolarPanelResponse[]>();

const zoom = ref(5);
const bounds = ref({
  _northEast: { lat: 53.41322, lng: -1.559482 },
  _southWest: { lat: 53.21322, lng: -1.559482 }
});
const center = ref([53.21322, -1.559482]);


const onZoomChange = async (e: any) => {
  zoom.value = e;
}

const onBoundsChange = async (e: any) => {
  bounds.value = e
  console.log("bounds", bounds.value)
  if (!showSolarPanels.value) {
    return
  }
  if (zoom.value < 12) {
    const {data, error} = await getClusteredSolarPanels(
        bounds.value._southWest.lat,  // min_lat
        bounds.value._northEast.lat,  // max_lat
        bounds.value._southWest.lng,  // min_lon
        bounds.value._northEast.lng,  // max_lon
        zoom.value
    );
    clusters.value = data
    console.log("clusters", clusters.value)
  }
  if (zoom.value >= 12) {
    const {data, error} = await getPanelsInBounds(
        bounds.value._southWest.lat,  // min_lat
        bounds.value._northEast.lat,  // max_lat
        bounds.value._southWest.lng,  // min_lon
        bounds.value._northEast.lng,  // max_lon
    )
    panels.value = data
    console.log("panels", panels.value)
  }
}

const onClusterMarkerClick = (e: any) => {
  const { lat, lng } = e.latlng;

  center.value = [lat, lng];

  // delay is needed to allow the map to update the center before zooming
  setTimeout(() => {
    const new_zoom = Math.min(zoom.value + 1, 15);
    onZoomChange(new_zoom);
  }, 300);
};


// Props
const props = defineProps<{
  lat: number | null
  lon: number | null
}>()

// Emitted event
const emits = defineEmits<{
  (e: 'update:location', latLng: { lat: number; lon: number }): void
}>()

const onMapClick = (e: any) => {
  emits('update:location', { lat: e.latlng.lat, lon: e.latlng.lng })
}

onMounted(async () => {
  const {data, error} = await getClusteredSolarPanels(bounds.value._northEast.lat, bounds.value._southWest.lat, bounds.value._northEast.lng, bounds.value._southWest.lng, zoom.value)
  clusters.value = data
})
</script>

<style scoped>
/* optional styles */
</style>