<script setup lang="ts">
import { Checkbox } from '../checkbox'
import { computed } from 'vue'

const props = defineProps({
  label: String,
  desc: String,
  icon: String,
  modelValue: {
    type: Boolean,
    default: undefined, // Чтобы можно было отличить "не передан" от false
  },
  checked: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
  (e: 'onCheck', value: boolean): void
}>()

const check = computed({
  get: () => props.modelValue ?? props.checked,
  set: (value) => {
    emits('update:modelValue', value)
    emits('onCheck', value)
  },
})
</script>

<template>
  <Button
    @click="check = !check"
    class="group h-8 md:!h-9 gap-2 py-1 md:!py-2 px-2 duration-150"
    :variant="check ? 'ring' : 'outline'"
    type="button"
    size="sm"
  >
    <span v-if="icon" class="iconify text-muted-foreground size-5 md:size-6" :class="[icon]"></span>

    <div v-if="label || desc" class="flex flex-col text-start flex-1">
      <span class="text-sm md:text-base">{{ label }}</span>
      <span class="text-xs md:text-sm text-muted-foreground">{{ desc }}</span>
    </div>

    <slot name="content"></slot>

    <Checkbox
      :model-value="check"
      class="cursor-pointer w-5 h-5 rounded-[var(--radius)] backdrop-blur-sm transition-all bg-none ml-auto dark:data-[state=unchecked]:group-hover:border-primary"
    />
  </Button>
</template>
