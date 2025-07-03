import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDonorStore } from './donor.store'

export const usePaymentStore = defineStore('payment', () => {
  const donorStore = useDonorStore()

  const paymentType = ref(null)
  const sum = ref(0)

  const payment = computed(() => {
    return {
      donor: donorStore.donor,
      paymentType: paymentType.value,
      amount: sum.value,
    }
  })

  const resetForm = () => {
    paymentType.value = null
    sum.value = null
  }

  const test = () => {
    console.log(donorStore.isComplete, paymentType.value, sum.value)
    console.log(payment.value)
  }

  const confirm = computed(() => {
    return donorStore.isComplete && paymentType.value && sum.value
  })

  return { paymentType, sum, payment, resetForm, confirm, test }
})
