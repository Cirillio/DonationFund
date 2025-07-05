<script setup>
import TextInput from '@/ui/Form/TextInput.vue'
import CheckBlock from '@/ui/Form/CheckBlock.vue'
import TextareaBlock from '@/ui/Form/TextareaBlock.vue'
import { useDonorStore } from '@/stores/donor.store'
import { usePaymentStore } from '@/stores/payment.store'
import { ref } from 'vue'
import { useDebounce } from '@/composables/useDebounce'
import validator from '@/utils/Validations'
import { toggleCheckBlock } from '@/ui/Form/toggleCheckBlock'

let debounce = null

const { donor, post } = useDonorStore()
const payment = usePaymentStore()

const inputPhoneRef = ref(null)
const handleInputPhone = useDebounce((...args) => (donor.phone = validator.phone(...args)), 10)
const handleInputName = useDebounce((...args) => (donor.name = validator.name(...args)), 10)
const handleInputBirth = useDebounce((...args) => (donor.birth = validator.birth(...args)), 10)
const handleCheckAnon = (payload) => (donor.anonymous = payload)
const handleCheckGroup = (payload) => (donor.group = payload)

const changeAmount = (payload) => {
  const { input } = payload
  const amount = parseFloat(input.value.replace(/[^\d.]/g, ''))
  input.value = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const inputAmount = (payload) => {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => {
    const { input, errors } = payload
    const amount = parseFloat(input.value.replace(/[^\d.]/g, ''))
    errors.value = []
    if (isNaN(amount) || amount < 10) {
      errors.value.push('Сумма пожертвования должна быть не меньше 10 рублей')
    }
    payment.sum = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }, 10)
}

const setPaymentType = (type) => {
  payment.paymentType = type
}

const inputDesc = (payload) => {
  donor.desc = payload
}
</script>

<template>
  <form action="" class="flex flex-col w-full gap-2">
    <CheckBlock
      :onChange="handleCheckAnon"
      :disabled="donor.anonymous"
      :status="donor.anonymous"
      icon="f7--question-circle"
      title="Анонимно"
      description="Сделать пожертвование анонимным"
    />
    <CheckBlock
      :onChange="handleCheckGroup"
      :status="donor.group"
      icon="f7--person-2"
      title="Группа"
      description="Сделать пожертвование от лица группы"
    />
    <div
      v-auto-animate
      class="flex flex-col w-full gap-2 duration-300 transition-all overflow-x-hidden px-1"
    >
      <TextInput
        ref="inputPhoneRef"
        @input="handleInputPhone"
        :value="donor.phone"
        type="tel"
        icon="f7--phone"
        label="Телефон"
        placeholder="Укажите ваш телефон"
      />
      <TextInput
        class="transition-all duration-300"
        v-if="!donor.anonymous"
        @input="handleInputName"
        :value="donor.name"
        type="text"
        icon="f7--person"
        label="ФИО"
        placeholder="Введите ваше ФИО"
      />
      <TextInput
        @input="handleInputBirth"
        :value="donor.birth"
        type="date"
        icon="f7--calendar"
        label="Дата рождения*"
        placeholder="Ваша дата рождения"
      />
    </div>

    <TextareaBlock
      @input="inputDesc"
      icon="f7--ellipses-bubble"
      placeholder="Вы можете оставить пожелаconsole.log()ние или список людей, участвующих в пожертвовании"
    />

    <TextInput
      @change="changeAmount"
      @input="inputAmount"
      type="text"
      icon="f7--money-rubl"
      label="Сумма"
      placeholder="Минимум 10 рублей"
    />

    <select class="select w-full appearance-none" aria-label="select">
      <option disabled :selected="!payment.paymentType">Выберите способ оплаты</option>
      <option @click="setPaymentType('sbp')" :selected="payment.paymentType === 'sbp'">СБП</option>
      <option @click="setPaymentType('online')" :selected="payment.paymentType === 'online'">
        Картой онлайн
      </option>
    </select>
    <button
      :disabled="!payment.confirm"
      @click.prevent="
        () => {
          post()
          payment.test()
          console.log(inputPhoneRef.data)
        }
      "
      class="btn btn-block btn-primary"
    >
      Сделать пожертвование
    </button>
  </form>
</template>
