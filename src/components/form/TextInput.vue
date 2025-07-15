<script lang="ts" setup>
import { IVModelInput } from '@/interfaces/IVModelInput'
defineProps<IVModelInput>()

const emit = defineEmits(['update:modelValue', 'blur'])
const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value) // Обновляем v-model
}
const handleBlur = () => emit('blur')
</script>

<template>
  <div class="flex flex-col flex-1 !duration-300">
    <Label v-if="label" for="name" class="pb-1.5 text-base">{{ label }}</Label>
    <div class="relative">
      <Input
        class="!text-base"
        :type="type"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :aria-invalid="errors ? 'true' : undefined"
        :class="{
          'border-destructive hover:!border-destructive': errors,
          'pl-9': icon,
        }"
        @input="handleInput"
        @blur="handleBlur"
      />
      <span
        v-if="icon"
        class="absolute start-0 inset-y-0 text-black flex items-center justify-center h-full px-2"
      >
        <span class="iconify size-6 text-muted-foreground" :class="icon"></span>
      </span>
    </div>
    <span
      v-if="errors"
      class="text-red-500 before:content-[''] before:rounded-full before:bg-destructive before:w-1.5 before:h-1.5 before:my-auto before:mr-1 flex before:inline-block before:ml-0.5 text-xs mt-1"
      >{{ errors }}</span
    >
  </div>
</template>
