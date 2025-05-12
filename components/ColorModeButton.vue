<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon }   from '#components'

const colorMode = useColorMode()

const toggle = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const props = defineProps({
  buttonText: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <Button
    @click="toggle"
    variant="ghost"
    class="p-2 rounded-md"
  >
    <!-- Show sun icon for light mode -->
    <Icon
      v-if="colorMode.value === 'light'"
      name="solar:sun-bold"
      class="w-5 h-5 text-gray-900"
    />
    <!-- Show moon icon for dark mode -->
    <Icon
      v-else
      name="solar:moon-bold"
      class="w-5 h-5 text-gray-100"
    />
    <span>{{buttonText}}</span>
  </Button>
</template>