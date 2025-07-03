<script setup>
import TextInput from '@/ui/TextInput.vue'
import CheckBlock from '@/ui/CheckBlock.vue'
import TextareaBlock from '@/ui/TextareaBlock.vue'
import { useDonorStore } from '@/stores/donor.store'
import { usePaymentStore } from '@/stores/payment.store'
let debounce = null

const { donor, post } = useDonorStore()
const payment = usePaymentStore()

const inputPhone = (payload) => {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => {
    console.log(payload)
    const { input, errors } = payload
    const phone = input.value
    errors.value = []
    if (!/^8\d{10}$/.test(phone)) {
      errors.value.push('Телефон должен начинаться с 8 и содержать 11 цифр')
    }

    if (!/^\d+$/.test(phone)) {
      errors.value.push('Телефон должен содержать только цифры')
    }

    donor.phone = phone
  }, 100)
}

const inputName = (payload) => {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => {
    console.log(payload)
    const { input, errors } = payload
    const name = input.value
    errors.value = []
    const re = /^([А-Я][а-я]+) ([А-Я][а-я]+) ([А-Я][а-я]+)$/
    if (!re.test(name)) {
      errors.value.push('Заполните в формате "Фамилия Имя Отчество"')
    }

    donor.name = name
  }, 100)
}

const inputBirth = (payload) => {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => {
    console.log(payload)
    const { input, errors } = payload
    const birth = input.value
    errors.value = []
    const today = new Date()
    const birthDate = new Date(birth)
    if (isNaN(birthDate.getTime())) {
      errors.value.push('Дата рождения в неверном формате')
    }
    if (birthDate > today) {
      errors.value.push('Дата рождения не может быть в будущем')
    }
    if (today.getFullYear() - birthDate.getFullYear() < 18) {
      errors.value.push('Вы должны быть старше 18 лет')
    }

    donor.birth = birth
  }, 100)
}

const toggleAnon = (payload) => {
  const { status, disabled } = payload

  if (debounce) clearTimeout(debounce)
  donor.anonymous = status
  disabled.value = true

  debounce = setTimeout(() => {
    disabled.value = false
  }, 300)
}

const toggleGroup = (payload) => {
  const { status, disabled } = payload

  if (debounce) clearTimeout(debounce)
  donor.group = status
  disabled.value = true

  debounce = setTimeout(() => {
    disabled.value = false
  }, 300)
}

const inputDesc = (payload) => {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => {
    console.log(payload)
    const desc = payload
    donor.desc = desc
  }, 50)
}

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
</script>

<template>
  <form action="" class="flex flex-col w-full gap-2">
    <CheckBlock
      @update:status="toggleAnon"
      :status="donor.anonymous"
      icon="f7--question-circle"
      title="Анонимно"
      description="Сделать пожертвование анонимным"
    />
    <CheckBlock
      @update:status="toggleGroup"
      :status="donor.group"
      icon="f7--person-2"
      title="Группа"
      description="Сделать пожертвование от лица группы"
    />
    <div
      v-auto-animate
      class="flex flex-col w-full gap-2 duration-300 transition-all overflow-x-hidden px-1"
      :class="{ '-mt-2': donor.anonymous, '-mt-0': !donor.anonymous }"
    >
      <TextInput
        v-if="!donor.anonymous"
        @input="inputPhone"
        :value="donor.phone"
        type="tel"
        icon="f7--phone"
        label="Телефон"
        placeholder="Укажите ваш телефон"
      />
      <TextInput
        v-if="!donor.anonymous"
        @input="inputName"
        :value="donor.name"
        type="text"
        icon="f7--person"
        label="ФИО"
        placeholder="Введите ваше ФИО"
      />
      <TextInput
        v-if="!donor.anonymous"
        @input="inputBirth"
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
      placeholder="Вы можете оставить пожелание или список людей, участвующих в пожертвовании"
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
      @click.prevent="
        () => {
          post()
          payment.test()
        }
      "
      class="btn btn-block btn-primary"
    >
      Сделать пожертвование
    </button>
  </form>
</template>
