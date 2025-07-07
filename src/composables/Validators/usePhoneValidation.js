import { ref, onBeforeUnmount, computed, watch } from 'vue'
import { parsePhoneNumberWithError } from 'libphonenumber-js'

export function usePhoneValidation(phoneNumber) {
  const errors = ref([])
  const isValid = ref(null)

  const selectedCountry = ref('RU')
  const countries = [
    {
      id: 'RU',
      icon: '🇷🇺',
      name: 'Россия',
      code: '+7',
      mask: '+7 (###) ###-##-##',
    },
    {
      id: 'TJ',
      icon: '🇹🇯',
      name: 'Таджикистан',
      code: '+992',
      mask: '+992 ## ### ## ##',
    },
  ]

  watch(selectedCountry, () => (phoneNumber.value = currentCountry.value.code))

  const currentCountry = computed(
    () => countries[countries.findIndex((c) => c.id === selectedCountry.value)],
  )

  let abortController = null

  const validate = (value) => {
    if (abortController) abortController.abort()
    abortController = new AbortController()

    validatePhone(value, abortController.signal)
    isValid.value = errors.value.length === 0

    return isValid.value
  }

  const validatePhone = () => {
    errors.value = []

    if (!phoneNumber.value) {
      errors.value.push('Поле не может быть пустым')
      return
    }

    try {
      const number = parsePhoneNumberWithError(phoneNumber.value, selectedCountry.value)

      if (!number || !number.isValid()) {
        errors.value.push('Неверный формат телефона')
        return
      }

      if (number.country !== selectedCountry.value) {
        errors.value.push(`Номер должен быть из ${currentCountry.value.name}`)
        return
      }
    } catch (error) {
      if (error.message === 'TOO_SHORT') {
        errors.value.push('Введите полный номер телефона')
      } else if (error.message === 'NOT_A_NUMBER') {
        errors.value.push('Номер содержит недопустимые символы')
      } else if (error.message === 'INVALID_COUNTRY') {
        errors.value.push('Укажите корректную страну')
      } else {
        errors.value.push('Произошла ошибка при проверке номера')
      }
    }
  }

  onBeforeUnmount(() => {
    if (abortController) abortController.abort()
    abortController = null
    errors.value = []
    isValid.value = null
  })

  return {
    errors,
    isValid,
    validate,
    selectedCountry,
    countries,
    currentCountry,
  }
}
