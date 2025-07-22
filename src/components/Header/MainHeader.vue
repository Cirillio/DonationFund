<script lang="ts" setup>
import { useHeaderLinks } from './headerLinks'
import { useRouter } from 'vue-router'
const router = useRouter()

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
          <button :disabled="activeLink?.name === link.name" @click="() => router.push(link.url)">
            <span class="iconify size-5" :class="link.icon"></span>
            <span>{{ link.title }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </Card>
</template>
