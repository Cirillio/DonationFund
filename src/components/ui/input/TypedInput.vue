<script lang="ts" setup>
type InputProps = {
  label?: string
  placeholder?: string
  name: string
  type?: string
  icon?: string
}

defineProps<InputProps>()
</script>

<template>
  <div class="flex flex-col !flex-1 !duration-150">
    <Label v-if="label" :for="name" class="pb-0.25 md:pb-1.25 text-sm md:text-base w-fit">{{
      label
    }}</Label>
    <div class="relative flex gap-2">
      <Input
        :class="{ 'pl-8 md:pl-10': icon }"
        :type="type"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        v-bind="$attrs"
      />
      <span
        v-if="icon"
        class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <span class="iconify size-5 text-muted-foreground" :class="icon"></span>
      </span>

      <slot name="actionButton" />
    </div>
  </div>
</template>
