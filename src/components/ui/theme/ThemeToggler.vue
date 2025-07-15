<template>
  <DropdownMenu class="">
    <DropdownMenuTrigger as-child>
      <Button class="aspect-square w-fit p-0" variant="outline">
        <span 
          class="h-[1.2rem] iconify f7--moon w-[1.2rem] size-6 p-0 text-lg rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <span 
          class="absolute iconify f7--sun-min h-[1.2rem] size-6 p-0 text-lg w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent position="start">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// Pass { disableTransition: false } to enable transitions
const mode = useColorMode({ disableTransition: false })
</script>