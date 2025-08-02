<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useNavLinks } from '../../composables/useNavLinks'
const { links, activeLink } = useNavLinks()
const router = useRouter()
</script>

<template>
  <nav
    class="z-10 flex max-md:w-full max-md:bg-card max-md:border-t border-border max-md:shadow-sm"
  >
    <ul class="flex w-full justify-evenly max-md:py-2 max-md:px-2 gap-2 items-center md:w-fit">
      <li v-for="link in links" :key="link.name" class="w-fit max-md:w-full">
        <Button
          @click="router.push(link.url)"
          class="max-md:w-full max-md:py-6 md:h-fit md:px-2 md:py-0.5"
          :variant="link.name === activeLink?.name ? 'default' : 'text'"
        >
          <span class="iconify max-md:size-6 size-5" :class="link.icon"></span>
          <span class="max-md:hidden">{{ link.title }}</span>
        </Button>
      </li>
    </ul>
  </nav>
</template>
