<script setup>
import { ref } from 'vue'

defineProps({
  placeholder: String,
  icon: String,
})
const iconRef = ref()

const emit = defineEmits(['input'])
const inputRef = ref('')

const input = () => {
  emit('input', inputRef.value)
}
</script>

<template>
  <div class="textarea shadow-xs shadow-base-content/25 group min-h-32 p-0">
    <span
      ref="iconRef"
      class="iconify text-base-content/80 mt-2 ml-4 size-5 shrink-0"
      :class="icon"
    ></span>
    <textarea
      v-model="inputRef"
      @input="input"
      class="grow text-sm resize-none mx-2"
      :placeholder="placeholder"
      @focus="() => iconRef.classList.add('text-primary')"
      @blur="() => iconRef.classList.remove('text-primary')"
    ></textarea>
  </div>
</template>
