<script lang="ts" setup generic="T">
import { ref, computed, defineExpose } from 'vue'

const internalSelectedValue = ref<T | undefined>(undefined)

const selected = computed<T | undefined>(() => internalSelectedValue.value)

const select = (value: T): T | null => {
  const isCurrentlySelected =
    internalSelectedValue.value !== undefined && internalSelectedValue.value === value

  const newValue = isCurrentlySelected ? null : value

  internalSelectedValue.value = newValue

  return newValue
}

defineExpose({ select: (s: T) => select(s) })
</script>

<template>
  <div class="overflow-auto grid h-fit no-scrollbar p-1 min-w-0">
    <div class="flex gap-2 w-full min-w-0">
      <slot name="item" :select="select" :selected="selected" />
    </div>
  </div>
</template>
