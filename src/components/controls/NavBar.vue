<script lang="ts" setup>
import { useNavLinks } from '../../composables/useNavLinks'
const { links, activeLink } = useNavLinks()
</script>

<template>
  <nav class="flex max-md:w-full max-md:border-t border-border max-md:shadow-sm">
    <ul class="flex w-full justify-evenly max-md:py-2 max-md:px-2 gap-2 items-center md:w-fit">
      <li v-for="link in links" :key="link.name" class="w-fit max-md:w-full">
        <RouterLink :to="link.url">
          <button
            class="appearance-none max-md:rounded-t-[var(--radius)] max-md:py-3 flex max-md:flex-1 max-md:w-full justify-center md:py-2 md:px-2 items-center hover:bg-input/20 gap-2 hover:border-ring/20 active:bg-input/20 active:border-ring/20 border-b-2 border-transparent transition-all duration-150 cursor-pointer"
            :class="{ '!border-primary bg-input/25': link.name === activeLink?.name }"
          >
            <span class="iconify size-6 md:size-5" :class="link.icon"></span>
            <span class="max-md:hidden">{{ link.title }}</span>
          </button>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
