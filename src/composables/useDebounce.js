import { onBeforeUnmount } from 'vue'

export function useDebounce(callback, delay) {
  let timeout = null

  onBeforeUnmount(() => {
    clearTimeout(timeout)
  })

  return (...args) => {
    console.log(delay)
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), delay)
  }
}
