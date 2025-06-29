<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  icon: String,
  to: {
    type: String,
    required: true,
  },
})

const route = useRoute()
const isActive = computed(() => route.path === '/' + props.to)
</script>

<template>
  <router-link :to="'/' + to">
    <button class="btn btn-lg btn-square btn-soft" :class="{ 'btn-accent': isActive }">
      <span :class="`icon-[f7--${icon}]  size-8`"></span>
    </button>
  </router-link>
</template>
