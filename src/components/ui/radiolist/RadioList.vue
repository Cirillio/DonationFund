<script lang="ts" setup generic="T">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: T
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T | undefined): void
}>()

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const select = (value: T) =>
  (selected.value = selected.value && selected.value === value ? undefined : value)
</script>

<template>
  <div class="overflow-auto grid no-scrollbar p-1 min-w-0">
    <div class="flex gap-1 w-full min-w-0">
      <slot name="item" :select="select" :selected="selected" />
    </div>
  </div>
</template>
