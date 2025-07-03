<script setup>
import { useWindowWide } from '@/composables/useWindowWide'
import HeaderNav from './HeaderNav.vue'
import { ref } from 'vue'

const navVisible = ref(true)
useWindowWide(400, navVisible)
</script>

<template>
  <header class="flex justify-between flex-col sm:flex-row gap-2 items-center p-2">
    <span
      class="text-2xl px-4 py-0 font-bold shrink-0 text-shadow-lg select-none flex items-center w-full justify-center sm:justify-start sm:w-fit"
    >
      Donation Fund
    </span>

    <HeaderNav v-if="navVisible" />
  </header>
</template>
