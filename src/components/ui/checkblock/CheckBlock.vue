<script setup lang="ts">
import { Checkbox } from '../checkbox'
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  desc: String,
  icon: String,
  checkStatus: {
    type: Boolean,
    default: false,
  },
  modelValue: Boolean,
})

const checked = ref(props.checkStatus)

const emit = defineEmits(['check:update', 'update:modelValue'])

const check = () => {
  checked.value = !checked.value
  emit('update:modelValue', checked.value)
}

watch(checked, () => emit('check:update', checked.value))
</script>

<template>
  <div
    @click="check"
    class="light-bordered px-3 py-2 min-w-0 select-none gap-2 group dark:bg-input/30 dark:hover:bg-input/30 flex items-center transition-all rounded-md cursor-pointer"
    :class="{
      '!border-ring hover:!border-ring ring-ring/50 ring-[3px] bg-popover/30': checked,
      'hover:bg-popover/20': !checked,
    }"
  >
    <span class="iconify text-muted-foreground size-6" :class="[icon]"></span>

    <div class="flex flex-col flex-1">
      <span class="text-base">{{ label }}</span>
      <span class="text-sm text-muted-foreground">{{ desc }}</span>
    </div>

    <Checkbox
      :model-value="checked"
      class="cursor-pointer rounded-md backdrop-blur-sm transition-all group-hover:border-muted-foreground/50 bg-none ml-auto dark:data-[state=unchecked]:group-hover:border-primary"
    />
  </div>
</template>
