import { defineStore } from 'pinia'
import { ref, computed, Ref } from 'vue'

export type Step = {
  name?: string
  required: boolean
  completed: Ref<boolean>
  info?: any
}

export const useStepperStore = defineStore('stepper', () => {
  const steps = ref<Step[]>([])

  const currentStep = ref<number>()

  const isFirstStep = computed(() => currentStep.value === 0)
  const isLastStep = computed(() => currentStep.value === steps.value.length - 1)

  const canGoNext = computed(() => {
    if (currentStep.value === undefined) return false
    return (
      (steps.value[currentStep.value].completed || !steps.value[currentStep.value].required) &&
      currentStep.value < steps.value.length
    )
  })

  const canGoPrev = computed(() => {
    if (currentStep.value === undefined) return false
    return currentStep.value > 0
  })

  const initStepper = (params: { steps: Step[]; initialStep?: number }) => {
    steps.value = params.steps
    currentStep.value = params.initialStep || 0
  }

  const setStepCompleted = (index: number, completed: boolean) => {
    checkIndex(index)
    steps.value[index].completed = completed
  }

  const currentStepData = computed(() =>
    currentStep.value !== undefined ? steps.value[currentStep.value] : undefined
  )

  const completedRatio = computed(() => {
    const completed = steps.value.filter((s) => s.completed).length
    const total = steps.value.length
    return total === 0 ? 0 : completed / total
  })

  const next = () => {
    if (currentStep.value === undefined) throw new Error('Current step is not defined')
    currentStep.value++
  }

  const prev = () => {
    if (currentStep.value === undefined) throw new Error('Current step is not defined')
    currentStep.value--
  }

  const checkIndex = (index: number) => {
    if (!steps.value[index]) throw new Error('Invalid step index')
  }

  return {
    initStepper,
    completedRatio,
    steps,
    currentStep,
    setStepCompleted,
    next,
    prev,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrev,
    currentStepData,
  }
})
