<script setup>
import { onMounted, ref, watch } from 'vue'
import { useValidation } from '@/composables/validators/useValidation'
import { phoneConfig } from '@/utils/configs/phone.config'
import ErrorList from '../Errors/ErrorList.vue'
import CustomDropdown from '../Dropdown/CustomDropdown.vue'
import CountryLi from '../Dropdown/CountryLi.vue'
const iconRef = ref()

const props = defineProps({
  icon: String,
  label: String,
  placeholder: String,
  defaultCountry: String,
})

const phoneNumber = ref('')
const { selectedCountry, countries, currentCountry, validatePhone } = phoneConfig({
  defaultCountry: props.defaultCountry,
})
const { isValid, errors, validate, reset: resetValidation } = useValidation(validatePhone)
const inputUpdate = () => {
  validate(phoneNumber.value)
}

watch(selectedCountry, () => {
  phoneNumber.value = currentCountry.value.code
  resetValidation()
})

onMounted(() => {
  phoneNumber.value = currentCountry.value.code
})

const selectCountry = (value) => (selectedCountry.value = value.id)
</script>

<template>
  <div class="flex flex-col relative">
    <span v-if="label" class="text-base-content text-base font-normal italic px-1 pb-1">{{
      label
    }}</span>
    <div class="flex join box-shadow rounded-[var(--radius-field)]">
      <div class="input border-r-0 join-item items-center max-sm:w-full pr-0 group">
        <span
          ref="iconRef"
          class="iconify text-base-content/80 my-auto me-3 size-5 sm:size-6 shrink-0"
          :class="[icon, { 'text-success': isValid, 'text-error': errors.length > 0 }]"
        ></span>
        <input
          v-mask="currentCountry.mask"
          v-model="phoneNumber"
          @input="inputUpdate"
          class="grow max-sm:text-sm"
          :class="{
            'is-valid': isValid && phoneNumber !== '',
            'is-invalid': errors.length > 0,
          }"
          type="tel"
          name="phone"
          :placeholder="placeholder"
          @focus="() => (errors.length == 0 ? iconRef.classList.add('text-primary') : '')"
          @blur="() => iconRef.classList.remove('text-primary')"
        />
      </div>
      <CustomDropdown
        v-model="selectedCountry"
        @select="selectCountry"
        :initialValue="countries.find((c) => c.id === defaultCountry) || 'RU'"
      >
        <template #activator="{ isOpen, selectedValue }">
          <button
            :class="[
              'btn join-item text-base btn-square border-base-content/40 btn-outline',
              { 'btn-active': isOpen },
            ]"
          >
            {{ selectedValue.icon }}
          </button>
        </template>

        <template #dropdown-content="{ selectItem, selectedValue }">
          <country-li
            v-for="c in countries"
            :key="c.id"
            :country="c"
            :onSelect="() => selectItem(c)"
            :selected="c.id === selectedValue.id"
          />
        </template>
      </CustomDropdown>
    </div>
    <error-list class="absolute top-full left-0" :errors="errors" />
  </div>
</template>
