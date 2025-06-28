<script lang="ts" setup>
import HeaderLink from './HeaderLink.vue'

const links = [
  { to: '', label: 'Home' },
  { to: 'stats', label: 'Stats' },
  { to: 'news', label: 'News' },
]
</script>

<template>
  <ul class="flex w-full justify-evenly">
    <HeaderLink v-for="link in links" :key="link.to" :to="link.to" :label="link.label" />
  </ul>
</template>
