import type { IHeaderLink } from '@/interfaces/IHeaderLink'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { headerLinks } from '@/data/header.links.data'

export function useHeaderLinks() {
  const route = useRoute()

  const activeLink = ref<IHeaderLink>()

  watch(
    () => route.name,
    (newName) => {
      activeLink.value = headerLinks.value.find((link) => link.name === newName)
    }
  )

  const links = computed(() => {
    return headerLinks.value.map((link) => {
      return {
        ...link,
        active: link.name === activeLink.value?.name,
      }
    })
  })

  return {
    links,
    activeLink,
  }
}
