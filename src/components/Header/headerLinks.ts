import type { IHeaderLink } from '@/interfaces/IHeaderLink'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const headerLinks = ref<IHeaderLink[]>([
  {
    name: 'donat',
    title: 'Пожертвования',
    url: '/',
    icon: 'f7--heart',
    active: false,
  },
  {
    name: 'stats',
    title: 'Статистика',
    url: '/stats',
    icon: 'f7--chart-pie',
    active: false,
  },
  {
    name: 'news',
    title: 'Новости',
    url: '/news',
    icon: 'f7--envelope',
    active: false,
  },
])

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
