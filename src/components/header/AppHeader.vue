<script lang="ts" setup>
import NavBar from '../controls/NavBar.vue'
</script>

<template>
  <Card class="p-0 x-pad !border-b border-0 rounded-none shadow-none">
    <header class="flex flex-col md:flex-row py-2 items-baseline justify-between">
      <div class="w-fit flex items-baseline">
        <span class="text-2xl px-4 font-bold">Donation Fund</span>
      </div>

      <NavBar class="max-md:hidden" />
    </header>
  </Card>
</template>
