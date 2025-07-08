<script setup>
import { ref, onBeforeUnmount } from 'vue'
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
  onChange: Function,
})

let disDebounce = null
const statusRef = ref(props.status)
const disabled = ref(false)

const emit = defineEmits(['update:status'])

const handleChange = () => {
  if (disDebounce) clearTimeout
  disabled.value = true
  toggleStatus()
  props.onChange(statusRef.value)
  disDebounce = setTimeout(() => {
    disabled.value = false
  }, 200)
}

const toggleStatus = () => {
  emit('update:status', {
    status: statusRef.value,
    disabled: disabled,
  })
}

onBeforeUnmount(() => {
  clearTimeout(disDebounce)
})
</script>

<template>
  <label
    class="custom-option z-0 bg-base-100 group transition-colors py-1 px-2 flex items-center gap-2 cursor-pointer select-none box-shadow"
  >
    <span
      class="size-6 duration-150 transition-colors"
      :class="` iconify ${icon} ` + (statusRef ? 'text-primary' : '')"
    ></span>
    <div class="flex-1 text-start">
      <h6
        :class="statusRef ? 'text-primary' : ''"
        class="text-sm font-semibold duration-150 transition-colors"
      >
        {{ title }}
      </h6>
    </div>
    <input
      :disabled="disabled"
      @change="handleChange"
      type="checkbox"
      class="checkbox p-[2px] checkbox-xs transition-all group-hover:bg-primary/10 group-hover:checked:bg-primary duration-200 checkbox-primary"
      v-model="statusRef"
    />
  </label>
</template>

<!-- 
<span
        :class="statusRef ? 'text-primary/75' : ''"
        class="text-xs duration-150 line-clamp-2 transition-colors"
      >
        {{ description }}</span
      > -->
