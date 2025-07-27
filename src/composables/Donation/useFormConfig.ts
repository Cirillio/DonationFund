import { useCodeSelector } from '@/composables/usePhonecodeSelector'
import { useCurrencyInput, CurrencyInputOptions } from 'vue-currency-input'
import type { CodeSelector } from '@/types/codeSelector'
import type { Payment } from '@/types/payment'
interface FormConfig {
  phoneSelector: CodeSelector
  currencyOptions: CurrencyInputOptions
  paymentTypes: Payment[]
}

export function useFormConfig(config: FormConfig) {
  const { selected: phoneMaskSelected, currentMask: phoneMask } = useCodeSelector(
    config.phoneSelector
  )

  const {
    inputRef: currencyRef,
    formattedValue: currencyFormatted,
    numberValue: currencyNumber,
    setValue: currencySet,
  } = useCurrencyInput(config.currencyOptions)

  return {
    phoneMaskSelected,
    phoneMask,
    currencyRef,
    currencyFormatted,
    currencyNumber,
    currencySet,
    paymentTypes: config.paymentTypes,
  }
}
