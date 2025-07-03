<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
  icon: String,
  to: String,
})

const route = useRoute()
const isActive = computed(() => route.path === '/' + props.to)
</script>

<template>
  <router-link class="flex-1" :to="'/' + to">
    <button
      class="btn btn-block btn-xl btn-text"
      :class="{ 'btn-active': isActive, 'btn-primary': !isActive }"
    >
      <span :class="`iconify ${icon} size-7`"></span>
    </button>
  </router-link>
</template>
