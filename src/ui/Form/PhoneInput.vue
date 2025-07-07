<script setup>
import { onMounted, ref } from 'vue'
import ErrorList from '../Errors/ErrorList.vue'
import DefaultSelect from './DefaultSelect.vue'
import { usePhoneValidation } from '@/composables/Validators/usePhoneValidation'
const iconRef = ref()

defineProps({
  icon: String,
  label: String,
  placeholder: String,
})

const phoneNumber = ref('')

const { errors, isValid, validate, selectedCountry, countries, currentCountry } =
  usePhoneValidation(phoneNumber)

onMounted(() => {
  phoneNumber.value = currentCountry.value.code
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
        v-mask="currentCountry.mask"
        v-model="phoneNumber"
        @input="validate"
        class="grow max-sm:text-sm"
        :class="{
          'is-valid': isValid && phoneNumber !== '',
          'is-invalid': !isValid && errors.length > 0,
        }"
        type="tel"
        name="phone"
        :placeholder="placeholder"
        @focus="() => (errors.length == 0 ? iconRef.classList.add('text-primary') : '')"
        @blur="() => iconRef.classList.remove('text-primary')"
      />
    </div>

    <default-select class="mt-1" v-model="selectedCountry">
      <option
        v-for="country in countries"
        :key="country.id"
        :value="country.id"
        :selected="country.id === selectedCountry"
      >
        {{ country.icon }}
        ({{ country.code }})
        {{ country.name }}
      </option>
    </default-select>

    <error-list :errors="errors" />
  </div>
</template>
