<script setup lang="ts">
import AppHeader from '@/components/header/AppHeader.vue'
import AppFooter from './components/footer/AppFooter.vue'
</script>

<template>
  <div class="h-dvh min-w-0 mx-auto flex flex-col bg-card/80 backdrop-blur-xs text-card-foreground">
    <AppHeader />
    <main class="flex flex-col h-full flex-1 overflow-y-auto justify-center items-center">
      <router-view></router-view>
    </main>
    <AppFooter />
  </div>
</template>
