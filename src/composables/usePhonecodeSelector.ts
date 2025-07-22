import { ref, watch } from 'vue'
import type { ICountry } from '@/interfaces/ICountry'
import { countries } from '@/data/countries.data'

const useCodeSelector = (_default: string) => {
  const selected = ref<ICountry>(countries.find((c) => c.id === _default) as ICountry)
  const currentMask = ref<string>('')

  watch(
    () => selected.value.id,
    (newId) => {
      const foundCountry = countries.find((c) => c.id === newId)

      if (foundCountry) {
        currentMask.value = foundCountry.mask
      } else {
        currentMask.value = ''
        console.warn(`Страна с ID ${newId} не найдена.`)
      }
    },
    { immediate: true }
  )

  return { selected, currentMask }
}

export { useCodeSelector, countries }
