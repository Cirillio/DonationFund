<script setup>
const model = defineModel()
</script>

<template>
  <div class="select select-sm w-full shadow-xs shadow-base-content/25">
    <div class="select-floating">
      <select
        v-model="model"
        aria-label="Select floating label"
        id="selectFloating"
        class="pl-0 -ml-3"
      >
        <slot></slot>
      </select>
    </div>
  </div>
</template>
