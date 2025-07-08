import { ref, onBeforeUnmount } from 'vue'

export function useValidation(validation) {
  const errors = ref([])
  const isValid = ref(null)

  let abortController = null

  const validate = (value) => {
    if (abortController) abortController.abort()
    abortController = new AbortController()

    errors.value = validation(value, abortController.signal)
    isValid.value = errors.value.length === 0

    return isValid.value
  }

  const reset = () => {
    errors.value = []
    isValid.value = null
  }

  onBeforeUnmount(() => {
    if (abortController) abortController.abort()
    abortController = null
    reset()
  })

  return {
    errors,
    isValid,
    validate,
    reset,
  }
}
