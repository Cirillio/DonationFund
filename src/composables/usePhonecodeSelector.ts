import { ref, watch } from 'vue'
import type { PhoneSpec } from '@/types/number'
import type { CodeSelector } from '@/types/codeSelector'

const useCodeSelector = (params: CodeSelector) => {
  const selected = ref<PhoneSpec>(
    params.phoneSpecs.find((c) => c.id === params._default) as PhoneSpec
  )
  const currentMask = ref<string>('')

  watch(
    () => selected.value.id,
    (newId) => {
      const foundCountry = params.phoneSpecs.find((c) => c.id === newId)

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

export { useCodeSelector }
