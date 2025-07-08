<template>
  <div
    class="badge badge-error rounded-[var(--radius-field)] bg-error/95 badge-sm text-start p-1 h-fit w-full justify-start shadow-sm shadow-base-content/25"
  >
    {{ error }}
  </div>
</template>

<script setup>
defineProps({
  error: String,
})
</script>
