<script setup>
import DonorForm from '@/components/DonorForm/DonorForm.vue'
</script>

<template>
  <div class="flex flex-col gap-4 p-4 items-center mx-auto flex-1">
    <h1 class="text-shadow-xs text-xl sm:text-3xl font-bold">Пожертвование</h1>

    <div class="max-[400px]:w-full max-w-[436px]">
      <DonorForm />
      <div class="divider my-2"></div>
      <p class="text-xs text-base-content/50 leading-4">
        *Совершать пожертвования могут только лица, достигшие 18 лет
      </p>
    </div>
  </div>
</template>

<style scoped></style>
