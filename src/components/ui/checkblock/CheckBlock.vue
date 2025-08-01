<script setup lang="ts">
import { Checkbox } from '../checkbox'
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  desc: String,
  icon: String,
  modelValue: Boolean,
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const check = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
})
</script>

<template>
  <Button
    @click="check = !check"
    class="group !h-9 gap-2 !py-2 px-2 duration-150"
    :variant="check ? 'ring' : 'outline'"
    type="button"
    size="sm"
  >
    <span class="iconify text-muted-foreground size-6" :class="[icon]"></span>

    <div class="flex flex-col text-start flex-1">
      <span class="text-base">{{ label }}</span>
      <span class="text-sm text-muted-foreground">{{ desc }}</span>
    </div>

    <Checkbox
      :model-value="check"
      class="cursor-pointer aspect-square !min-h-full rounded-[var(--radius)] backdrop-blur-sm transition-all group-hover:border-muted-foreground/50 bg-none ml-auto dark:data-[state=unchecked]:group-hover:border-primary"
    />
  </Button>
</template>
