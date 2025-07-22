<script lang="ts" setup>
import Form from '@/components/DonationForm/index.vue'
import DonationForm from '@/components/DonationForm/DonationForm.vue'
import { Check, Circle, Dot } from 'lucide-vue-next'
import { ref } from 'vue'

const steps = [
  {
    step: 1,
    title: 'Контакты',
    description: 'Пожалуйста, введите свои контактные данные, чтобы мы могли связаться с вами',
  },
  {
    step: 2,
    title: 'Дополнительная информация',
    description: 'A few details about your company will help us personalize your experience',
  },
  {
    step: 3,
    title: 'Invite your team',
    description:
      'Start collaborating with your team by inviting them to join your account. You can skip this step and invite them later',
  },
]

const donationForm = ref()
</script>

<template>
  <main class="max-w-[786px] min-w-0 flex w-full">
    <Card class="grid gap-4 grid-cols-5 min-w-0 w-full px-4">
      <!-- <div class="border border-input col-span-2 rounded-lg p-2">
        <Stepper
          orientation="vertical"
          class="mx-auto flex w-full max-w-md flex-col justify-start gap-10"
        >
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full items-start gap-6"
            :step="step.step"
          >
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1].step"
              class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
            />

            <StepperTrigger as-child>
              <Button
                :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                size="icon"
                class="z-10 rounded-full shrink-0"
                :class="[
                  state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
                ]"
              >
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>

            <div class="flex flex-col gap-1">
              <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base"
              >
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                :class="[state === 'active' && 'text-primary']"
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
              >
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </Stepper>
      </div> -->

      <div v-if="donationForm" class="col-span-2 col-start-1 border">
        <Table>
          <TableHeader>
            <TableRow class="flex items-center justify-center text-center">
              <TableHead class="flex-1 flex items-center justify-center"> FieldName </TableHead>
              <TableHead class="flex-1 flex items-center justify-center"> FieldValue </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              class="flex items-center justify-center text-center"
              v-for="(value, key) in donationForm.fields"
              :key="key"
            >
              <TableCell class="flex-1 text-start pl-4">{{ key }}</TableCell>
              <TableCell class="flex-1 text-start">{{ value }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <DonationForm ref="donationForm" class="col-span-3 col-start-3" />
    </Card>
  </main>
</template>
