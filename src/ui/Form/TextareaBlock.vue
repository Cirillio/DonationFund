<script setup>
import { ref } from 'vue'

defineProps({
  placeholder: String,
  icon: String,
})

const emit = defineEmits(['input'])
const inputRef = ref('')

const input = () => {
  emit('input', inputRef.value)
}
</script>

<template>
  <div class="textarea group min-h-32 p-0">
    <span class="iconify text-base-content/80 mt-2 ml-4 size-5 shrink-0" :class="icon"></span>
    <textarea
      v-model="inputRef"
      @input="input"
      class="grow text-sm resize-none mx-2"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>
