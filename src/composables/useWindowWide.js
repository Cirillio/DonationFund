import { onMounted, onBeforeUnmount } from 'vue'

export function useWindowWide(min = 640, ref) {
  let resObs = null
  let debounce = null

  const checkMinWidth = () => {
    const winWidth = window.innerWidth
    ref.value = winWidth >= min
  }

  const debCheck = () => {
    if (debounce) {
      clearTimeout(debounce)
    }
    debounce = setTimeout(checkMinWidth, 25)
  }

  onMounted(() => {
    checkMinWidth()
    resObs = new ResizeObserver(debCheck)
    resObs.observe(document.body)
  })

  onBeforeUnmount(() => {
    if (resObs) {
      resObs.disconnect()
    }
  })
}

