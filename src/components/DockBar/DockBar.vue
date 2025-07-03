<script setup>
import DockBarButton from './DockBarButton.vue'
import { ref } from 'vue'

const expanded = ref(true)

const toggle = () => (expanded.value = !expanded.value)
</script>

<template>
  <div
    class="fixed left-0 w-full transition-all ease-out"
    :class="expanded ? '-bottom-0' : '-bottom-16'"
  >
    <div
      class="flex flex-col w-full overflow-hidden shadow-sm/50 shadow-black/75 bg-base-100 h-fit rounded-t-md"
    >
      <div
        class="mx-auto w-full flex items-center justify-center h-fit active:bg-primary/5 active:*:text-primary transition-colors"
        @click="toggle"
      >
        <span
          :class="`${expanded ? 'icon-[f7--chevron-compact-down]' : 'icon-[f7--chevron-compact-up]'} text-primary/75 transition-colors size-8`"
        ></span>
      </div>
      <div class="flex w-full items-center justify-center gap-2 p-2">
        <DockBarButton icon="f7--house-alt" to="" />
        <DockBarButton icon="f7--chart-bar-square" to="stats" />
        <DockBarButton icon="f7--doc-richtext" to="news" />
      </div>
    </div>
  </div>
</template>
