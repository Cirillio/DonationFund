<script lang="ts" setup>
import { useField } from 'vee-validate'
import TextInput from '../form/TextInput.vue'
import PhoneInput from '../form/PhoneInput.vue'

const {
  value: phone,
  errorMessage: phoneError,
  handleBlur: phoneBlur,
  resetField: resetPhone,
} = useField<string>('phone')
const {
  value: username,
  errorMessage: usernameError,
  handleBlur: usernameBlur,
} = useField<string>('username')
const { value: birth, errorMessage: birthError, handleBlur: birthBlur } = useField<string>('birth')
</script>

<template>
  <CardTitledContent
    title="Личная информация"
    desc="Пожалуйста, укажите свою личную информацию"
    icon="f7--person"
  >
    <div class="flex flex-col flex-1 gap-2">
      <!-- Phone -->
      <PhoneInput
        label="Телефон"
        placeholder="Укажите номер телефона"
        name="phone"
        v-model="phone"
        icon="f7--phone"
        :errors="phoneError"
        @blur="phoneBlur"
        @update:code="resetPhone"
      />
      <!-- Name -->
      <TextInput
        label="Имя (Пустое поле = аноним)"
        type="text"
        placeholder="Имя или ФИО"
        v-model="username"
        name="username"
        icon="f7--person"
        :errors="usernameError"
        @blur="usernameBlur"
      />
      <!-- Birth -->
      <TextInput
        label="Дата рождения"
        placeholder=""
        type="date"
        v-model="(birth as string | undefined)"
        name="birth"
        icon="f7--calendar"
        :errors="birthError"
        @blur="birthBlur"
      />
    </div>
  </CardTitledContent>
</template>
