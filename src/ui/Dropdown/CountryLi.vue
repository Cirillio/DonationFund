<script setup>
defineProps({
  country: Object,
  selected: Boolean,
  onSelect: Function,
})
</script>
<template>
  <div
    :class="[
      'flex gap-1 bg-base-100 text-sm active:bg-base-300/20 hover:bg-base-300/20 transition-all duration-100 cursor-pointer px-3 py-1.5',
      { 'bg-base-300/10': selected },
    ]"
    @click="onSelect"
  >
    <span> {{ country.icon }} </span>
    <span>{{ country.name }} </span>
    <span class="ml-auto text-base-content/75">({{ country.code }}) </span>
  </div>
</template>
