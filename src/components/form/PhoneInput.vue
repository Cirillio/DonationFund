<script lang="ts" setup>
import { ref, watch } from 'vue'
import { IVModelInput } from '@/interfaces/IVModelInput'
import { ChevronDownIcon } from 'lucide-vue-next'
import type { ICountry } from '@/interfaces/ICountry'
import { countries } from '@/data/countries'

defineProps<IVModelInput>()

const emit = defineEmits(['update:modelValue', 'update:isValid', 'blur', 'update:code'])

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value) // Обновляем v-model
}

const handleBlur = () => emit('blur')

const selected = ref<ICountry>(countries[0])
const currentMask = ref<string>('')

watch(
  () => selected.value.id,
  (newId) => {
    const foundCountry = countries.find((c) => c.id === newId)

    if (foundCountry) {
      currentMask.value = foundCountry.mask
      emit('update:code')
    } else {
      currentMask.value = ''
      console.warn(`Страна с ID ${newId} не найдена.`)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex gap-2 w-full items-end">
    <div class="flex flex-col flex-1">
      <Label for="phone" class="pb-1.5 text-base">{{ label }}</Label>
      <div class="relative flex gap-2">
        <Input
          class="!text-base"
          :class="{ 'pl-9': icon }"
          v-mask="currentMask"
          type="tel"
          :id="name"
          :name="name"
          :placeholder="placeholder"
          :value="modelValue"
          :aria-invalid="errors ? 'true' : undefined"
          @input="handleInput"
          @blur="handleBlur"
        />
        <span
          v-if="icon"
          class="absolute start-0 inset-y-0 text-black flex items-center justify-center h-full px-2"
        >
          <span class="iconify f7--phone size-6 text-muted-foreground"></span>
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              class="px-2 py-0 h-10 border border-input dark:hover:border-primary gap-1 justify-between w-fit"
            >
              <span v-if="selected" class="text-base">{{ selected.icon }}</span>
              <span v-else class="text-sm text-muted-foreground">Select</span>
              <ChevronDownIcon class="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            :align="'end'"
            class="min-w-[var(--radix-dropdown-menu-trigger-width)] gap-1 flex flex-col !right-0"
          >
            <DropdownMenuItem
              v-for="c in countries"
              :key="c.id"
              @select="selected = c"
              class="flex border items-center px-2 py-1 text-sm gap-2"
              :class="{
                'border-primary': selected.code === c.code,
                'border-background': selected.code !== c.code,
              }"
            >
              <span class="text-base">{{ c.icon }}</span>
              <span>{{ c.name }}</span>
              <span class="ml-auto text-muted-foreground">{{ c.code }}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <span v-if="errors" class="text-red-500 text-sm mt-1">{{ errors }}</span>
    </div>
  </div>
</template>
