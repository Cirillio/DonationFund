<script setup>
import { ref, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/payment.store'
import { useDonorStore } from '@/stores/donor.store'

import TextInput from '@/ui/Form/TextInput.vue'
import CheckBlock from '@/ui/Form/CheckBlock.vue'
import TextareaBlock from '@/ui/Form/TextareaBlock.vue'
import PhoneInput from '@/ui/Form/PhoneInput.vue'

const { donor, post, resetForm } = useDonorStore()
const payment = usePaymentStore()

const inputPhoneRef = ref(null)

const handleCheckAnon = (payload) => (donor.anonymous = payload)
const handleCheckGroup = (payload) => (donor.group = payload)

const formatAmount = (amount) => {
  // 1. Проверка на допустимые символы
  if (!/^[\d .]+$/.test(amount)) return '0.00'

  // 2. Очистка и нормализация
  const cleaned = amount
    .replace(/ /g, '') // Удаляем все пробелы
    .replace(/\.+/g, '.') // Заменяем множественные точки на одну
    .replace(/(\..*)\./g, '$1') // Удаляем лишние точки после первой

  // 3. Проверка на валидное число
  const numericValue = parseFloat(cleaned)
  if (isNaN(numericValue)) return '0.00'

  // 4. Форматирование результата
  return numericValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const setPaymentType = (type) => {
  payment.paymentType = type
}

const inputDesc = (payload) => {
  donor.desc = payload
}

onMounted(() => resetForm)
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
    <div v-auto-animate class="flex flex-col w-full gap-2 duration-300 transition-all px-1">
      <PhoneInput icon="f7--phone" label="Телефон" placeholder="Укажите ваш телефон" />
      <TextInput
        class="transition-all duration-300"
        v-if="!donor.anonymous"
        v-model="donor.name"
        type="text"
        icon="f7--person"
        label="ФИО"
        placeholder="Введите ваше ФИО"
      />
      <TextInput
        v-model="donor.birth"
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
      :formatter="formatAmount"
      v-model="payment.sum"
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
