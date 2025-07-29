<script setup lang="ts">
import MainHeader from '@/components/header/MainHeader.vue'
</script>

<template>
  <div class="min-h-dvh p-2 min-w-0 mx-auto flex flex-col gap-1">
    <!-- <main-header /> -->
    <div v-auto-animate class="flex flex-col h-full flex-1 justify-center items-center">
      <router-view></router-view>
    </div>
  </div>
</template>
