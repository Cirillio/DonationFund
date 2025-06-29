<script lang="ts" setup>
import { ref } from 'vue'
defineProps({
  icon: String,
  placeholder: String,
})
const iconRef = ref()
</script>

<template>
  <div class="input max-sm:w-full">
    <span
      ref="iconRef"
      class="text-base-content/80 my-auto me-3 size-5 shrink-0"
      :class="`icon-[f7--${icon}]`"
    ></span>
    <input
      @focus="() => iconRef.classList.add('text-primary')"
      @blur="() => iconRef.classList.remove('text-primary')"
      type="text"
      class="grow"
      :placeholder="placeholder"
      id="leadingIconDefault"
    />
  </div>
</template>
