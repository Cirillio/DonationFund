<template>
  <div v-if="errors" class="flex flex-col gap-1 p-1">
    <ErrorLi v-for="error in errors" :key="error" :error="error" />
  </div>
</template>

<script setup>
import ErrorLi from './ErrorLi.vue'
defineProps({
  errors: Array,
})
</script>
