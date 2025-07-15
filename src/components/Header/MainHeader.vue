<script lang="ts" setup>
import { useHeaderLinks } from './headerLinks'
const { links, activeLink } = useHeaderLinks()
</script>

<template>
  <Card class="flex flex-row p-4 gap-4">
    <div class="">
      <span class="text-2xl font-bold">Donation Fund</span>
    </div>
    <nav class="flex flex-1">
      <ul class="flex w-full justify-around">
        <li v-for="link in links" :key="link.name">
          <RouterLink :to="link.url">
            <Button :variant="link.name === activeLink?.name ? 'default' : 'outline'">
              <span class="iconify size-5" :class="link.icon"></span>
              <span>{{ link.title }}</span>
            </Button>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </Card>
</template>
