<script lang="ts" setup>
import Separator from '../separator/Separator.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  desc: String,
  icon: String,
})
</script>

<template>
  <div class="flex flex-col gap-6 flex-1">
    <div class="flex flex-col gap-2">
      <div class="flex flex-col gap-1.5">
        <div class="flex gap-2">
          <span class="iconify border my-auto size-6 dark:text-primary" :class="[icon]"></span>
          <span class="text-xl">{{ title }}</span>
        </div>
        <Separator />
        <span class="text-sm text-muted-foreground">{{ desc }}</span>
      </div>
    </div>
    <div class="flex h-full">
      <slot />
    </div>
  </div>
</template>
