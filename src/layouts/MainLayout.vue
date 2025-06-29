<script setup lang="ts">
import AppHeader from '@/components/Header/AppHeader.vue'
import AppFooter from '@/components/Footer/AppFooter.vue'
import DockBar from '@/components/DockBar/DockBar.vue'
document.body.dataset.theme = 1 ? 'shadcn' : 'corporate'
</script>

<template>
  <div class="flex flex-col gap-2 p-1 max-w-[868px] mx-auto min-h-dvh max-sm:pb-10">
    <AppHeader />
    <div class="divider w-2/3 mx-auto"></div>
    <div class="flex flex-1">
      <RouterView />
    </div>
    <div class="divider w-2/3 mx-auto"></div>
    <AppFooter />
    <DockBar />
  </div>
</template>
