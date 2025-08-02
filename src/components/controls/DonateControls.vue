<script lang="ts" setup>
import { useStepperStore } from '@/stores/stepper.store'

const stepper = useStepperStore()
</script>

<template>
  <div class="flex gap-4 justify-between">
    <Button
      v-if="!stepper.isFirstStep"
      @click="stepper.prev"
      :disabled="!stepper.canGoPrev"
      variant="outline"
    >
      Назад
    </Button>
    <Button
      class="w-full text-sm md:text-base"
      v-if="stepper.currentStep !== 1"
      @click="stepper.next"
      :disabled="!stepper.canGoNext"
    >
      К оплате
    </Button>
    <Button
      class="ml-auto flex-1 md:text-base"
      v-if="stepper.currentStep === 1"
      :disabled="!stepper.currentStepData?.completed"
    >
      Оплатить
    </Button>
  </div>
</template>
