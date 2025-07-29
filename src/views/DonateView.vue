<script lang="ts" setup>
import DonationForm from '@/components/forms/DonationForm.vue'
</script>

<template>
  <main class="max-w-[468px] min-w-0 flex w-full">
    <Card class="min-w-0 w-full">
      <CardHeader>
        <CardTitle> Пожертвование </CardTitle>
      </CardHeader>
      <Separator />
      <DonationForm ref="donationForm" class="px-4" />
      <Separator />
      <CardFooter></CardFooter>
    </Card>
  </main>
</template>
