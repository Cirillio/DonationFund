import type { Step } from '@/stores/stepper.store'
import { useDonationStore } from '@/stores/donation.store'
import { storeToRefs } from 'pinia'

const donationStore = useDonationStore()

const { blankValid, payValid } = storeToRefs(donationStore)

export const formSteps: Step[] = [
  {
    name: 'blank',
    required: true,
    completed: blankValid,
    info: {
      title: 'Анкета',
    },
  },
  {
    name: 'pay',
    required: true,
    completed: payValid,
    info: {
      title: 'Оплата',
    },
  },
]
