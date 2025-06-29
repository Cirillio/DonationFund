<script lang="ts" setup>
import HeaderLink from './HeaderLink.vue'

const links = [
  { to: '', label: 'Пожертвовать' },
  { to: 'stats', label: 'Статистика' },
  { to: 'news', label: 'Новости' },
]
</script>

<template>
  <ul class="flex w-full flex-col sm:flex-row gap-1 sm:gap-0 sm:justify-evenly">
    <HeaderLink v-for="link in links" :key="link.to" :to="link.to" :label="link.label" />
  </ul>
</template>
