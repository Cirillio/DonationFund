import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Consumer } from '@/types/consumer'

export const useConsumerStore = defineStore('consumer', () => {
  const consumer = ref<Consumer>({
    id: 0,
    anonymous: false,
    name: '',
    phone: '',
    birth: '',
    group: false,
    desc: '',
  })

  const isComplete = computed(() => {
    return consumer.value.anonymous
      ? true
      : consumer.value.name !== '' && consumer.value.phone !== '' && consumer.value.birth !== ''
  })

  const setAnon = (): void => {
    consumer.value.anonymous = !consumer.value.anonymous
  }

  const setName = (name: string): void => {
    consumer.value.name = name
  }

  const setPhone = (phone: string): void => {
    consumer.value.phone = phone
  }

  const setBirth = (birth: string): void => {
    consumer.value.birth = birth
  }

  const setGroup = (): void => {
    consumer.value.group = !consumer.value.group
  }

  const setDesc = (desc: string): void => {
    consumer.value.desc = desc
  }

  const resetForm = (): void => {
    consumer.value = {
      id: 0,
      anonymous: false,
      name: '',
      phone: '',
      birth: '',
      group: false,
      desc: '',
    }
  }

  return { consumer }
})
