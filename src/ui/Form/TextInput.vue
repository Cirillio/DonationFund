<script setup>
import ErrorList from '../Errors/ErrorList.vue'
import { useValidation } from '@/composables/useValidation'
import { ref, defineExpose, defineModel } from 'vue'
const iconRef = ref()

const props = defineProps({
  icon: String,
  label: String,
  placeholder: String,
  type: String,
  value: String,
  validator: Function,
  formatter: {
    type: Function,
    default: (value) => value,
  },
})

let debounce = null
const inputRef = ref('')
const loading = ref(false)
const model = defineModel()

const { errors, isValid, validate } = useValidation(props.validator, '')
const emit = defineEmits(['input', 'change'])

const input = () => {
  if (debounce) clearTimeout(debounce)
  loading.value = true
  debounce = setTimeout(() => {
    emit('input', inputRef.value)
    validate(inputRef.value)
    if (isValid.value && model) model.value = props.formatter(inputRef.value)
    loading.value = false
  }, 200)
}

const change = () => {
  if (debounce) clearTimeout(debounce)
  loading.value = false
  validate(inputRef.value)
  if (isValid.value) {
    model.value = props.formatter(inputRef.value)
    inputRef.value = props.formatter(inputRef.value)
  }
  emit('change', inputRef.value)
}

defineExpose({
  data: inputRef.value,
  validate: () => validate(inputRef.value),
})
</script>

<template>
  <div class="flex flex-col">
    <span v-if="label" class="text-base-content text-base font-normal italic px-1 pb-1">{{
      label
    }}</span>
    <div class="input max-sm:w-full pr-0 shadow-xs group shadow-base-content/25">
      <span
        ref="iconRef"
        class="iconify text-base-content/80 my-auto me-3 size-5 sm:size-6 shrink-0"
        :class="[icon, { 'text-success': isValid, 'text-error': !isValid && errors.length > 0 }]"
      ></span>
      <input
        v-model="inputRef"
        @input="input"
        @change="change"
        :type="type"
        :placeholder="placeholder"
        :name="icon"
        class="grow max-sm:text-sm"
        :class="{
          'is-valid': isValid && inputRef !== '',
          'is-invalid': !isValid && errors.length > 0,
        }"
        @focus="() => (errors.length == 0 ? iconRef.classList.add('text-primary') : '')"
        @blur="() => iconRef.classList.remove('text-primary')"
      />
      <span
        v-if="loading"
        class="iconify line-md--loading-twotone-loop text-accent my-auto mx-2 size-5 sm:size-6 shrink-0"
      ></span>
    </div>
    <error-list :errors="errors" />
  </div>
</template>
