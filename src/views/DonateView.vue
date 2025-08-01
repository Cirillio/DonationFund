<script lang="ts" setup>
import { BlankForm, PayForm } from '@/components/forms'
</script>

<template>
  <div class="flex мflex-1 w-full pt-40 justify-center items-center gap-10">
    <!-- <Card>
      <CardContent>
        <Stepper
          orientation="vertical"
          class="mx-auto flex w-full max-w-md flex-col justify-start gap-10"
        >
          <StepperItem
            v-for="(step, index) in steps"
            :key="step.name"
            class="flex gap-4 relative"
            :step="index + 1"
            v-slot="{ state }"
          >
            <StepperSeparator
              v-if="index !== steps.length - 1"
              class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />

            <StepperTrigger as-child>
              <Button
                :variant="
                  steps[index].completed ? 'default' : currentStep === index ? 'ring' : 'outline'
                "
                size="icon"
                class="z-10 rounded-full shrink-0"
              >
                <div
                  class="iconify"
                  :class="{
                    'f7--checkmark-alt size-5': state === 'completed',
                    'f7--circle size-4': state === 'active',
                    'f7--circle-fill size-1': state === 'inactive',
                  }"
                ></div>
              </Button>
            </StepperTrigger>

            <div class="flex flex-col gap-1">
              <StepperTitle
                v-if="step.info"
                :class="{
                  'text-card-foreground': state === 'active',
                  'text-card-foreground/50': state !== 'active',
                }"
                class="text-sm font-medium transition"
              >
                {{ step.info.title }}
              </StepperTitle>
            </div>
          </StepperItem>
        </Stepper>
      </CardContent>
    </Card>
    <Button
      @click="prev"
      :disabled="!canGoPrev || isFirstStep"
      variant="outline"
      size="icon"
      class="rounded-full aspect-square"
    >
      <div class="iconify f7--arrow-left size-4"></div>
    </Button> -->
    <Card class="max-w-[686px]">
      <CardContent class="px-8 flex gap-4 flex-col">
        <PayForm />
        <BlankForm />
      </CardContent>
    </Card>
    <!-- <Button
      @click="next"
      :disabled="!canGoNext || isLastStep"
      variant="outline"
      size="icon"
      class="rounded-full aspect-square"
    >
      <div class="iconify f7--arrow-right size-4"></div>
    </Button> -->
  </div>
</template>
