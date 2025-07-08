<template>
  <div class="relative w-fit">
    <div @click="toggleDropdown">
      <slot name="activator" :isOpen="isOpen" :selectedValue="selectedValue"> </slot>
    </div>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute flex flex-col top-full mt-1 box-shadow overflow-y-auto rounded-[var(--radius-field)] right-0 w-60 h-fit max-h-44 bg-base-100 border border-primary"
      >
        <slot name="dropdown-content" :selectItem="selectItem" :selectedValue="selectedValue">
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, provide } from 'vue'

const props = defineProps({
  initialValue: {
    type: [String, Number, Object],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'select'])

const isOpen = ref(false)
const selectedValue = ref(props.initialValue)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectItem = (value) => {
  selectedValue.value = value
  emit('update:modelValue', value)
  emit('select', value)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  const dropdownElement = event.target.closest('.relative.w-fit')
  if (!dropdownElement || !dropdownElement.contains(event.target)) {
    isOpen.value = false
  }
}

watch(isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

provide('selectDropdownItem', selectItem)
provide('currentSelectedDropdownValue', selectedValue)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
