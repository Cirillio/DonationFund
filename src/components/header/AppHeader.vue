<script lang="ts" setup>
import NavBar from '../controls/NavBar.vue'
</script>

<template>
  <div class="x-pad border-b shadow-xs backdrop-blur-sm bg-card/50">
    <header class="flex flex-col md:flex-row py-2 items-baseline justify-between">
      <div class="w-fit flex items-center">
        <span class="text-xl px-4 font-bold text-foreground">Donation Fund</span>
      </div>

      <NavBar class="max-md:hidden" />
    </header>
  </div>
</template>
