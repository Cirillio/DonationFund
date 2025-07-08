import { parsePhoneNumberWithError } from 'libphonenumber-js'
import { ref, computed } from 'vue'

export function phoneConfig(options = { defaultCountry: 'RU' }) {
  const selectedCountry = ref(options.defaultCountry)
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

  const currentCountry = computed(
    () => countries[countries.findIndex((c) => c.id === selectedCountry.value)],
  )

  const validatePhone = (phoneNumber) => {
    const errors = []

    if (!phoneNumber) {
      errors.push('Поле не может быть пустым')
      return errors
    }

    try {
      const number = parsePhoneNumberWithError(phoneNumber, selectedCountry.value)

      if (!number || !number.isValid()) {
        errors.push('Неверный формат телефона')
        return errors
      }

      if (number.country !== selectedCountry.value) {
        errors.push(`Номер должен быть из ${currentCountry.value.name}`)
        return errors
      }
    } catch (error) {
      if (error.message === 'TOO_SHORT') errors.push('Введите полный номер телефона')
      else if (error.message === 'NOT_A_NUMBER') errors.push('Номер содержит недопустимые символы')
      else if (error.message === 'INVALID_COUNTRY') errors.push('Укажите корректную страну')
      else errors.push('Произошла ошибка при проверке номера')
    }
    return errors
  }

  return {
    selectedCountry,
    countries,
    currentCountry,
    validatePhone,
  }
}
