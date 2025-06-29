<script lang="ts" setup>
import DockBarButton from './DockBarButton.vue'
import { ref } from 'vue'

const expanded = ref(true)

const toggle = () => (expanded.value = !expanded.value)
</script>

<template>
  <div
    class="fixed left-0 w-full transition-all pb-2 px-2"
    :class="expanded ? '-bottom-0' : '-bottom-32'"
  >
    <div class="flex flex-col w-full rounded-sm shadow-sm shadow-black/50 bg-base-100 h-fit">
      <div class="mx-auto btn h-fit btn-text btn-block" @click="toggle">
        <span
          :class="`${expanded ? 'icon-[f7--chevron-compact-down]' : 'icon-[f7--chevron-compact-up]'} text-base-content/25 size-8`"
        ></span>
      </div>
      <div class="flex flex-col p-4 gap-4">
        <div class="flex w-full justify-evenly">
          <DockBarButton icon="money-rubl" to="" />
          <DockBarButton icon="chart-bar-square" to="stats" />
          <DockBarButton icon="doc-richtext" to="news" />
        </div>
        <span
          class="text-2xl px-4 py-0 font-bold shrink-0 text-shadow-lg select-none flex items-center w-full justify-center sm:justify-start sm:w-fit"
        >
          Donation Fund
        </span>
      </div>
    </div>
  </div>
</template>
