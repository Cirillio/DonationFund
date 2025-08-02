<script lang="ts" setup>
import { BlankForm, PayForm } from '@/components/forms'
import DonateControls from '@/components/controls/DonateControls.vue'
import { formSteps } from '@/data/donation/steps.data'
import { useStepperStore } from '@/stores/stepper.store'

const stepper = useStepperStore()
stepper.initStepper({ steps: formSteps })
</script>

<template>
  <div class="flex md:x-pad h-full py-10 flex-1 w-full justify-center items-center">
    <div class="max-w-[436px] w-full">
      <div class="md:px-8 px-4 flex gap-4 flex-col">
        <BlankForm v-if="stepper.currentStep === 0" />
        <PayForm v-if="stepper.currentStep === 1" />
        <div class="flex flex-col w-full">
          <div class="w-full h-[4px] rounded-full bg-ring/50">
            <div
              class="h-full bg-primary ring ring-primary rounded-full transition-all duration-150"
              :style="{ width: `${stepper.completedRatio * 100}%` }"
            />
          </div>
        </div>

        <DonateControls />
      </div>
    </div>
  </div>
</template>
