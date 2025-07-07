<script setup>
import { ref } from 'vue'
const themes = ['black', 'mintlify']
const theme = ref(document.body.dataset.theme)
const setTheme = (_theme) => {
  console.log(document.body.dataset.theme)
  theme.value = _theme
  document.body.dataset.theme = _theme
  console.log(document.body.dataset.theme)
}
</script>

<template>
  <div class="flex flex-col max-w-[400px] mx-auto items-center gap-2">
    <button
      class="btn btn-primary btn-block"
      :class="{
        'btn-outline': theme !== t,
      }"
      v-for="t in themes"
      :key="t"
      @click="setTheme(t)"
    >
      {{ t }}
    </button>
  </div>
</template>
