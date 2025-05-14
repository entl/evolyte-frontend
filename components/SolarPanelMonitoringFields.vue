<template>
    <div class="flex flex-col rounded-lg dark:bg-gray-900 bg-secondary h-full w-full py-2 px-4">
      <div class="font-light text-gray-500">
        {{ props.name  }}
      </div>
      <div class="flex flex-1 font-bold text-2xl items-center">
        <div class="flex items-end">
          {{ props.value }}
          <div class="text-gray-500 text-xs ml-1 mb-1">
            {{ props.unit }}
          </div>
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
  value: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: false,
  }
})

</script>

<style>

</style>