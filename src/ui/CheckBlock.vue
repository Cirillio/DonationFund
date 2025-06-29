<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  icon: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: Boolean,
})

const statusRef = ref(props.status)
</script>

<template>
  <label class="custom-option rounded-xs p-2 flex items-center gap-2 cursor-pointer select-none">
    <span
      class="size-8 duration-150 transition-colors"
      :class="`icon-[f7--${icon}]` + (statusRef ? ' text-primary' : '')"
    ></span>
    <div class="flex-1 text-start">
      <h6
        :class="statusRef ? 'text-primary' : ''"
        class="text-base font-semibold duration-150 transition-colors"
      >
        {{ title }}
      </h6>
      <span
        :class="statusRef ? 'text-primary/75' : ''"
        class="text-sm duration-150 transition-colors"
      >
        {{ description }}</span
      >
    </div>
    <input type="checkbox" class="checkbox rounded-xs checkbox-primary" v-model="statusRef" />
  </label>
</template>
