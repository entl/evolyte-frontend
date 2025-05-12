<template>
  <div>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a panel" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Solar Panels</SelectLabel>
          <SelectItem v-for="item in props.items" :value="item.id">
            {{ item.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  items: {
    type: Array as PropType<Array<{id: string | number, name: string}>>,
    required: true
  }
})
</script>

<style>
</style>
