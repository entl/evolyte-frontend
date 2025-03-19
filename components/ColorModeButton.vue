<script setup>
import { Button } from '@/components/ui/button'
import { ref, onMounted } from 'vue'


// State to manage the dark mode setting
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}

// Check local storage for the dark mode setting on mount
onBeforeMount(() => {
  if (localStorage.getItem('darkMode') === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

</script>
<template>
  <Button @click="toggleTheme" variant="ghost" class="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition">
    <template v-if="!isDark">
<!--      <Sun class="w-5 h-5 text-gray-900"/>-->
      <Icon name="solar:sun-bold" class="w-5 h-5 text-gray-900" />
    </template>
    <template v-else>
      <Icon name="solar:moon-bold" class="w-5 h-5 text-gray-100" />
<!--      <Moon class="w-5 h-5 text-gray-100"/>-->
    </template>
  </Button>
</template>