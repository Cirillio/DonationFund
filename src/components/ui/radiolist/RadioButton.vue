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
})
</script>

<template>
  <Button @click="onSelect" size="sm" :variant="selected ? 'secondary' : 'ghost'" type="button">
    <slot />
  </Button>
</template>
