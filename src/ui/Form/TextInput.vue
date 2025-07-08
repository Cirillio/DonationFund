<script setup>
import ErrorList from '../Errors/ErrorList.vue'
import { useValidation } from '@/composables/validators/useValidation'
import { ref } from 'vue'
const iconRef = ref()

const props = defineProps({
  icon: String,
  label: String,
  placeholder: String,
  formatter: {
    type: Function,
    default: (value) => value,
  },
})

const inputRef = ref('')
const loading = ref(false)

const { errors, isValid, validate } = useValidation(props.validator, '')
</script>

<template>
  <div class="flex flex-col">
    <span v-if="label" class="text-base-content text-base font-normal italic px-1 pb-1">{{
      label
    }}</span>
    <div class="input max-sm:w-full pr-0 group box-shadow">
      <span
        ref="iconRef"
        class="iconify text-base-content/80 my-auto me-3 size-5 sm:size-6 shrink-0"
        :class="[icon, { 'text-success': isValid, 'text-error': !isValid && errors.length > 0 }]"
      ></span>
      <input
        v-model="inputRef"
        type="text"
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
    <error-list v-if="errors.length > 0" :errors="errors" />
  </div>
</template>
