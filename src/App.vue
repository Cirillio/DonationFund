<script setup lang="ts">
import AppHeader from '@/components/header/AppHeader.vue'
import AppFooter from './components/footer/AppFooter.vue'
import NavBar from './components/controls/NavBar.vue'
</script>

<template>
  <div
    class="h-[100dvh] w-screen grid grid-rows-[auto_1fr_auto] bg-background text-card-foreground"
  >
    <AppHeader />
    <main class="overflow-y-scroll w-full h-full">
      <div class="flex flex-col h-full">
        <router-view></router-view>

        <AppFooter />
      </div>
    </main>
    <NavBar class="md:hidden" />
  </div>
</template>
