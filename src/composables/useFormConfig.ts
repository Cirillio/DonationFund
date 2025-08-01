import { computed } from 'vue'
import { useCodeSelector } from '@/composables/usePhonecodeSelector'
import { useCurrencyInput, CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input'
import { phoneSpecs } from '@/data/digits.data'
import type { CodeSelector } from '@/types/codeSelector.type'

type FormConfig = {
  phoneSelector?: CodeSelector
  currencyOptions?: CurrencyInputOptions
}

const DEFAULT_CURRENCY_OPTIONS: CurrencyInputOptions = {
  currency: 'RUB',
  currencyDisplay: CurrencyDisplay.hidden,
  precision: 2,
}

const DEFAULT_PHONE_SELECTOR: CodeSelector = {
  _default: 'RU',
  phoneSpecs: phoneSpecs,
}

export function useFormConfig(config: FormConfig = {}) {
  // Нормализуем опции для валюты, даже если ничего не передали
  const normalizedCurrencyOptions: CurrencyInputOptions = {
    ...DEFAULT_CURRENCY_OPTIONS,
    ...(config.currencyOptions ?? {}),
  }

  // Если phoneSelector не передан — полагаемся на дефолты внутри useCodeSelector
  const { selected: phoneMaskSelected, currentMask: phoneMask } = useCodeSelector(
    config.phoneSelector || DEFAULT_PHONE_SELECTOR
  )

  const {
    inputRef: currencyRef,
    formattedValue,
    numberValue,
    setValue,
  } = useCurrencyInput(normalizedCurrencyOptions)

  // Безопасные computed-обёртки — исключаем undefined на ранних стадиях
  const currencyFormatted = computed(() => formattedValue.value ?? '')
  const currencyNumber = computed(() => numberValue.value ?? 0)

  // Нормализуем вход для сеттера
  const currencySet = (val: number | null | undefined) => setValue(val ?? 0)

  return {
    phoneMaskSelected,
    phoneMask,
    currencyRef,
    currencyFormatted,
    currencyNumber,
    currencySet,
  }
}
