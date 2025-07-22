<script lang="ts" setup>
import { useHeaderLinks } from './headerLinks'
const { links, activeLink } = useHeaderLinks()
</script>

<template>
  <Card class="flex flex-row p-2 items-baseline justify-between">
    <div class="w-fit flex items-baseline">
      <span class="text-2xl px-4 font-bold">Donation Fund</span>
    </div>
    <nav class="flex">
      <ul class="flex w-fit gap-2">
        <li v-for="link in links" :key="link.name">
          <RouterLink :to="link.url">
            <Button :variant="link.name === activeLink?.name ? 'ring' : 'outline'">
              <span class="iconify size-5" :class="link.icon"></span>
              <span>{{ link.title }}</span>
            </Button>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </Card>
</template>
