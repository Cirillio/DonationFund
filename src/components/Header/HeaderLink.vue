<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <li class="flex">
    <router-link class="hover:text-neutral/50 txt-grad flex transition-all" :to="'/' + to">{{
      label
    }}</router-link>
  </li>
</template>
