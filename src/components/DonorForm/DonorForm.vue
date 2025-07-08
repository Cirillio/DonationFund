<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { usePaymentStore } from '@/stores/payment.store'
import { useDonorStore } from '@/stores/donor.store'

import TextInput from '@/ui/Form/TextInput.vue'
import CheckBlock from '@/ui/Form/CheckBlock.vue'
import TextareaBlock from '@/ui/Form/TextareaBlock.vue'
import PhoneInputSelect from '@/ui/Form/PhoneInputSelect.vue'

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

onBeforeUnmount(() => resetForm)
</script>

<template>
  <div class="flex flex-col w-full gap-1">
    <div v-auto-animate class="flex flex-col gap-1 w-full duration-300 transition-all py-0 px-1">
      <PhoneInputSelect
        icon="f7--phone"
        label="Телефон"
        placeholder="Укажите ваш телефон"
        default-country="RU"
        class="z-10"
      />
      <TextInput
        class="transition-all duration-300"
        v-if="!donor.anonymous"
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

    <div class="divider divider-dashed"></div>

    <div class="flex">
      <CheckBlock
        :onChange="handleCheckAnon"
        :disabled="donor.anonymous"
        :status="donor.anonymous"
        icon="f7--question-circle"
        title="Анонимно"
        description="Сделать пожертвование анонимным"
      />

      <div class="divider divider-dashed mx-1 divider-horizontal"></div>

      <CheckBlock
        :onChange="handleCheckGroup"
        :status="donor.group"
        icon="f7--person-2"
        title="Группа"
        description="Сделать пожертвование от лица группы"
      />
    </div>

    <TextareaBlock
      @input="inputDesc"
      icon="f7--ellipses-bubble"
      placeholder="Вы можете оставить пожелание или список людей, участвующих в пожертвовании"
    />

    <div class="divider divider-dashed"></div>

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

    <div class="divider divider-dashed my-1"></div>

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
  </div>
</template>
