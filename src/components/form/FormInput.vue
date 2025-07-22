<script lang="ts" setup>
import { IModelInput } from '@/interfaces/IVModelInput'
import { useField } from 'vee-validate'
import { computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'

const modelInput = defineProps<IModelInput>()

const { errors, value, meta } = useField(modelInput.name, toTypedSchema(modelInput.schema as any), {
  initialValue: modelInput.initialValue,
})

const valid = computed(() => errors.value.length === 0)
</script>

<template>
  <div class="flex flex-col flex-1 !duration-300">
    <Label v-if="label" :for="name" class="pb-1.25 text-base w-fit">{{ label }}</Label>
    <div class="relative flex gap-2">
      <Input
        class="!text-base"
        :type="type"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :aria-invalid="!valid"
        :aria-valid="valid && meta.dirty && meta.valid"
        :class="{
          'border-destructive hover:!border-destructive': !valid,
          'pl-9': icon,
        }"
        v-bind="$attrs"
        v-model="value"
      />
      <span
        v-if="icon"
        class="absolute start-0 inset-y-0 text-black flex items-center justify-center h-full px-2"
      >
        <span class="iconify size-6 text-muted-foreground" :class="icon"></span>
      </span>

      <slot name="actionButton" />
    </div>
    <div v-auto-animate>
      <span
        v-if="!valid"
        v-for="error in errors"
        :key="error"
        class="text-red-500 before:content-[''] before:rounded-full before:bg-destructive before:w-1.5 before:h-1.5 before:my-auto before:mr-1 flex before:inline-block before:ml-0.5 text-xs mt-1"
        >{{ error }}</span
      >
    </div>
  </div>
</template>
