<script setup>
import ErrorList from '../Errors/ErrorList.vue'
import { ref, watch, defineExpose } from 'vue'
const iconRef = ref()

const props = defineProps({
  icon: String,
  label: String,
  placeholder: String,
  type: String,
  value: String,
})

const inputRef = ref(props.value)
const errors = ref([])
const isValid = ref(props.value ? true : false)

const emit = defineEmits(['input', 'change'])
const emitData = {
  input: inputRef,
  errors: errors,
}

const input = () => emit('input', emitData)
const change = () => emit('change', emitData)

defineExpose({
  data: emitData,
  valid: isValid,
})

watch(errors, () => {
  isValid.value = errors.value.length === 0
})
</script>

<template>
  <div class="flex flex-col">
    <span v-if="label" class="text-base-content text-base font-normal italic px-1 pb-1">{{
      label
    }}</span>
    <div class="input max-sm:w-full shadow-xs group shadow-base-content/25">
      <span
        ref="iconRef"
        class="iconify text-base-content/80 my-auto me-3 size-5 sm:size-6 shrink-0"
        :class="[icon, { 'text-success': isValid, 'text-error': !isValid && errors.length > 0 }]"
      ></span>
      <input
        v-model="inputRef"
        @input="input"
        @change="change"
        @focus="() => (errors.length == 0 ? iconRef.classList.add('text-primary') : '')"
        @blur="() => iconRef.classList.remove('text-primary')"
        :type="type"
        :placeholder="placeholder"
        :name="icon"
        class="grow max-sm:text-sm"
        :class="{
          'is-valid': isValid && inputRef !== '',
          'is-invalid': !isValid && errors.length > 0,
        }"
      />
    </div>
    <error-list :errors="errors" />
  </div>
</template>
