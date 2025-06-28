<script setup lang="ts">
import AppHeader from '@/components/Header/AppHeader.vue'
import AppFooter from '@/components/Footer/AppFooter.vue'
document.body.dataset.theme = 1 ? 'shadcn' : 'corporate'
</script>

<template>
  <div class="flex flex-col gap-1 p-1 max-w-[868px] mx-auto min-h-dvh">
    <AppHeader />
    <div class="h-full body flex-1">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>
