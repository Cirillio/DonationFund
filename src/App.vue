<script setup lang="ts">
import MainHeader from '@/components/Header/MainHeader.vue'
</script>

<template>
  <div v-auto-animate class="min-h-dvh p-4 max-w-[846px] mx-auto flex flex-col gap-4">
    <main-header />
    <router-view></router-view>
  </div>
</template>
