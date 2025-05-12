<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <!-- <Icon name="ph:battery-charging-vertical" class="text-3xl" /> -->
      <Icon :name="props.iconName" class="text-3xl" />
      <span class="text-gray-500"> {{ props.featureName }} </span>
    </div>
    <div>
      <span class="font-bold text-2xl" :class="featureColor"> {{ props.featureValue }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  featureName: {
    type: String,
    required: true
  },
  featureValue: {
    type: String,
    required: true
  },
  featureColor: {
    type: String,
    required: false,
    validator: (value: string) => {
      return ['text-red-500', 'text-orange-500', 'text-green-500'].includes(value)
    }
  }
})
</script>

<style>
</style>
