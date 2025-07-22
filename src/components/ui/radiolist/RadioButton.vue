<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  onSelect: {
    type: Function as PropType<(...args: any[]) => void>,
    required: true,
  },
  _class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <Button :class="_class" @click="onSelect" :variant="selected ? 'ring' : 'ghost'" type="button">
    <slot />
  </Button>
</template>
