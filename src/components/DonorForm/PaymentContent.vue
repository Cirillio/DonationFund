<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CurrencyDisplay, useCurrencyInput } from 'vue-currency-input'
import { useField } from 'vee-validate'

const amounts = ref(['100,00', '500,00', '1000,00', '5000,00'])

const {
  value: amount,
  errorMessage: amountError,
  setValue: setFormAmount,
  handleBlur: amountBlur,
} = useField<number>('amou1nt')

const { setValue: setPaymentType, errorMessage: paymentError } = useField<string>('paymentType')

const {
  inputRef: amountRef,
  numberValue: amountValue,
  setValue: setCurAmount,
  formattedValue,
} = useCurrencyInput({
  currency: 'RUB',
  currencyDisplay: 'hidden' as CurrencyDisplay,
  precision: 2,
})

watch(amountValue, (newAmount) => {
  setFormAmount(Number(newAmount))
})
</script>

<template>
  <CardTitledContent
    desc="Минимальная сумма пожертвования 100 рублей"
    title="Оплата"
    icon="f7--creditcard"
  >
    <div class="flex flex-col gap-2 h-full flex-1">
      <div class="flex flex-col">
        <Label for="amount" class="pb-1.5 text-base">Сумма</Label>
        <div class="relative">
          <Input
            ref="amountRef"
            class="!text-base pl-9"
            type="text"
            id="amount"
            placeholder="100,00"
            :value="formattedValue"
            :aria-invalid="amountError ? 'true' : undefined"
            :class="{
              'border-destructive   hover:!border-destructive': amountError,
            }"
            @blur="amountBlur"
          />
          <span
            class="absolute start-0 inset-y-0 text-black flex items-center justify-center h-full px-2"
          >
            <span class="iconify f7--money-rubl-circle size-6 text-muted-foreground"></span>
          </span>
        </div>
        <span
          v-if="amountError"
          class="text-red-500 before:content-[''] before:rounded-full before:bg-destructive before:w-1.5 before:h-1.5 before:my-auto before:mr-1 flex before:inline-block before:ml-0.5 text-xs mt-1"
          >{{ amountError }}</span
        >
      </div>

      <div class="flex gap-2">
        <Button
          v-for="a in amounts"
          :key="a"
          @click="
            () => {
              setCurAmount(Number(a.replace(',', '.')))
              console.log(a, amount)
            }
          "
          size="sm"
          :variant="Number(a.replace(',', '.')) !== amount ? 'outline' : 'default'"
          type="button"
        >
          {{ a }}
        </Button>
      </div>

      <div class="flex flex-col">
        <Label for="payment" class="pb-1.5 text-base">Способ оплаты</Label>
        <Select>
          <SelectTrigger
            id="payment"
            class="w-full dark:hover:border-primary text-base !h-10"
            :class="{ 'border-destructive hover:!border-destructive': paymentError }"
          >
            <SelectValue placeholder="Выберите способ оплаты" />
          </SelectTrigger>
          <SelectContent class="bg-background !w-fit">
            <SelectGroup>
              <SelectItem @click="() => setPaymentType('sbp')" class="text-base" value="sbp">
                СБП</SelectItem
              >
              <SelectItem
                @click="() => setPaymentType('bank_card')"
                class="text-base"
                value="bank_card"
              >
                Картой Онлайн
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <span
          v-if="paymentError"
          class="text-red-500 before:content-[''] before:rounded-full before:bg-destructive before:w-1.5 before:h-1.5 before:my-auto before:mr-1 flex before:inline-block before:ml-0.5 text-xs mt-1"
          >{{ paymentError }}</span
        >
      </div>
    </div>
  </CardTitledContent>
</template>
