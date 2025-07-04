<script setup>
import { ref } from 'vue'
const props = defineProps({
  icon: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: Boolean,
})

const statusRef = ref(props.status)
const disabled = ref(false)

const emit = defineEmits(['update:status'])

const toggleStatus = () => {
  emit('update:status', {
    status: statusRef.value,
    disabled: disabled,
  })
}
</script>

<template>
  <label
    class="custom-option rounded-xs bg-base-100 p-2 flex items-center gap-2 cursor-pointer select-none shadow-base-content/25 shadow-xs"
  >
    <span
      class="size-6 sm:size-8 duration-150 transition-colors"
      :class="` iconify ${icon} ` + (statusRef ? 'text-primary' : '')"
    ></span>
    <div class="flex-1 text-start">
      <h6
        :class="statusRef ? 'text-primary' : ''"
        class="text-sm sm:text-base font-semibold duration-150 transition-colors"
      >
        {{ title }}
      </h6>
      <span
        :class="statusRef ? 'text-primary/75' : ''"
        class="text-xs sm:text-sm duration-150 line-clamp-2 transition-colors"
      >
        {{ description }}</span
      >
    </div>
    <input
      :disabled="disabled"
      @change="toggleStatus"
      type="checkbox"
      class="checkbox rounded-xs transition-all duration-200 checkbox-primary"
      v-model="statusRef"
    />
  </label>
</template>
