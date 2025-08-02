import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DEFAULT_PAY_FORM, DEFAULT_BLANK_FORM } from '@/data/donation'
import type { BlankSchema, PaySchema } from '@/data/donation'

export const useDonationStore = defineStore('donation', () => {
  const blankForm = ref<Partial<BlankSchema>>(DEFAULT_BLANK_FORM)
  const phoneCode = ref('RU')

  const payForm = ref<Partial<PaySchema>>(DEFAULT_PAY_FORM)

  const resetBlankForm = () => {
    blankForm.value = DEFAULT_BLANK_FORM
  }

  const resetPayForm = () => {
    payForm.value = DEFAULT_PAY_FORM
  }

  const resetAll = () => {
    resetBlankForm()
    resetPayForm()
  }

  const blankValid = ref(false)
  const payValid = ref(false)

  function setBlankValidity(isValid: boolean) {
    blankValid.value = isValid
  }

  function setPayValidity(isValid: boolean) {
    payValid.value = isValid
  }

  return {
    blankForm,
    phoneCode,
    payForm,
    resetBlankForm,
    resetPayForm,
    resetAll,
    setPayValidity,
    setBlankValidity,
    payValid,
    blankValid,
  }
})
