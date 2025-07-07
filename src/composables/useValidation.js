import { ref, onBeforeUnmount } from 'vue'
export function useValidation(validation, _def) {
  const errors = ref([])
  const isValid = ref(_def ? true : false)

  let abortController = null

  const validate = (value) => {
    console.log('useValid: ' + value)
    if (abortController) abortController.abort()
    abortController = new AbortController()

    errors.value = validation(value, abortController.signal)
    isValid.value = errors.value.length === 0

    return isValid.value
  }

  onBeforeUnmount(() => {
    if (abortController) abortController.abort()
    abortController = null
    errors.value = []
  })

  return {
    errors,
    isValid,
    validate,
  }
}
