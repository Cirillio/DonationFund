<script lang="ts" setup>
import Form from '@/components/DonorForm/Form.vue'
</script>

<template>
  <main class="w-full">
    <Card class="!bg-muted/10 grid gap-4 grid-cols-5 px-4">
      <div class="bg-primary col-span-2 rounded-lg"></div>
      <Form class="col-span-3 col-start-3" />
    </Card>
  </main>
</template>
