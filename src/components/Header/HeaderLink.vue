<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true },
})

const route = useRoute()
const isActive = computed(() => route.path === '/' + props.to)
</script>

<template>
  <li class="flex">
    <router-link
      class="btn transition-all duration-150 btn-sm btn-block"
      :class="{ 'btn-soft btn-accent': isActive, 'btn-text': !isActive }"
      :to="'/' + to"
    >
      {{ label }}
    </router-link>
  </li>
</template>
