<script lang="ts" setup>
defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  onSelect: {
    type: Function,
    required: true,
  },
  class: String,
})
</script>

<template>
  <Button :class="class" @click="onSelect" :variant="selected ? 'ring' : 'ghost'" type="button">
    <slot />
  </Button>
</template>
