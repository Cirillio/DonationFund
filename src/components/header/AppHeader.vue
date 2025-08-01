<script lang="ts" setup>
import { useNavLinks } from '../../composables/useNavLinks'
const { links, activeLink } = useNavLinks()
</script>

<template>
  <Card class="p-0 x-pad !border-b border-0 rounded-none">
    <header class="flex flex-row py-4 items-baseline justify-between">
      <div class="w-fit flex items-baseline">
        <span class="text-2xl px-4 font-bold">Donation Fund</span>
      </div>

      <nav class="flex">
        <ul class="flex w-fit gap-4">
          <li v-for="link in links" :key="link.name">
            <RouterLink :to="link.url">
              <Button size="sm" :variant="link.name === activeLink?.name ? 'ring' : 'outline'">
                <span class="iconify size-5" :class="link.icon"></span>
                <span>{{ link.title }}</span>
              </Button>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>
  </Card>
</template>
