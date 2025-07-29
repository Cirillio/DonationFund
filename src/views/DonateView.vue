<script lang="ts" setup>
import DonationForm from '@/components/forms/DonationForm.vue'
import { useStepperStore } from '@/stores/stepper.store'
import { storeToRefs } from 'pinia'
import { toRaw } from 'vue'

const { next, prev } = useStepperStore()
const { steps, currentStepData, currentStep, canGoNext, canGoPrev, isLastStep, isFirstStep } =
  storeToRefs(useStepperStore())
</script>

<template>
  <main class="max-w-[468px] min-w-0 flex w-full">
    <Card class="min-w-0 w-full">
      <CardHeader>
        <CardTitle> Пожертвование </CardTitle>
      </CardHeader>
      <Separator />
      <DonationForm ref="donationForm" class="px-6" />
      <Separator />
      <div class="flex w-full gap-2 justify-between h-fit px-6">
        <Button :disabled="!canGoPrev || isFirstStep" @click="prev" variant="ghost">Назад</Button>
        <span>{{ currentStep }}</span>
        <span>{{ currentStepData?.data }}</span>
        <Button :disabled="!canGoNext || isLastStep" @click="next" variant="default">Вперед</Button>
      </div>
      <pre>
        {{ toRaw(steps) }}
      </pre>
      <Separator />
      <CardFooter></CardFooter>
    </Card>
  </main>
</template>
