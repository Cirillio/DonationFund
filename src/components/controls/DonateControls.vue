<script lang="ts" setup>
import { useStepperStore } from '@/stores/stepper.store'

const stepper = useStepperStore()
</script>

<template>
  <div class="flex justify-between">
    <Button
      v-if="!stepper.isFirstStep"
      @click="stepper.prev"
      :disabled="!stepper.canGoPrev"
      variant="outline"
    >
      Назад
    </Button>
    <Button
      class="ml-auto h-8 text-sm md:h-9 md:text-base"
      v-if="stepper.currentStep !== 1"
      @click="stepper.next"
      :disabled="!stepper.canGoNext"
    >
      Далее
    </Button>
    <Button
      class="ml-auto h-8 text-sm md:h-9 md:text-base"
      v-if="stepper.currentStep === 1"
      :disabled="!stepper.currentStepData?.completed"
    >
      Оплатить
    </Button>
  </div>
</template>
