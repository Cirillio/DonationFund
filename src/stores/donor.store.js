import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDonorStore = defineStore('donor', () => {
  const donor = ref({
    anonymous: false,
    name: '',
    phone: '',
    birth: '',
    group: false,
    desc: '',
  })

  const isComplete = computed(() => {
    return donor.value.anonymous
      ? true
      : donor.value.name !== '' && donor.value.phone !== '' && donor.value.birth !== ''
  })

  const resetForm = () => {
    donor.value = {
      anonymous: false,
      name: '',
      phone: '',
      birth: '',
      group: false,
      desc: '',
    }
  }

  const post = () => {
    // console.log(donor.value)
    console.log(isComplete.value)
  }

  return { donor, isComplete, resetForm, post }
})
