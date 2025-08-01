<script lang="ts" setup>
import { ref, watch } from 'vue'
import { CurrencyDisplay } from 'vue-currency-input'
import { useFormConfig } from '@/composables/useFormConfig'
import { paySchema, paymentAmounts, paymentTypes } from '@/data/donation'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const { currencyFormatted, currencyNumber, currencyRef, currencySet } = useFormConfig({
  currencyOptions: {
    currency: 'RUB',
    currencyDisplay: CurrencyDisplay.hidden,
    precision: 2,
  },
})

const donorPay = useForm({
  validationSchema: toTypedSchema(paySchema),
  initialValues: {
    payAmount: 0,
  },
  name: 'donationPayment',
})

const amountsRef = ref()

watch(currencyNumber, (_new) => {
  const newAmount = _new || 0
  donorPay.resetField('payAmount')
  donorPay.setFieldValue('payAmount', newAmount, false)
  if (amountsRef.value.selected !== newAmount && amountsRef.value)
    amountsRef.value.select(undefined)
})
</script>

<template>
  <form @submit.prevent="">
    <CardTitledContent
      icon="f7--creditcard"
      title="Оплата"
      desc="Минимальная сумма пожертвования 100 рублей"
    >
      <div class="flex w-full gap-4">
        <div class="flex-1">
          <FormField v-slot="{ field, meta }" name="payAmount">
            <FormItem class="gap-0">
              <FormControl>
                <TypedInput
                  @blur="(e: Event) => (meta.dirty ? field.onBlur(e) : undefined)"
                  ref="currencyRef"
                  :value="currencyFormatted"
                  icon="f7--money-rubl"
                  label="Сумма пожертвования"
                  placeholder="100,00"
                  name="payAmount"
                  type="text"
                />
                <FormMessage />

                <RadioList class="mt-1" ref="amountsRef">
                  <template #item="{ select, selected }">
                    <RadioButton
                      class="text-sm"
                      v-for="_amount in paymentAmounts"
                      :key="_amount.label"
                      :onSelect="() => currencySet(select(_amount.value) as number | null)"
                      :selected="_amount.value === selected"
                      size="sm"
                    >
                      {{ _amount.label }}
                    </RadioButton>
                  </template>
                </RadioList>
              </FormControl>
            </FormItem>
          </FormField>
        </div>

        <Separator orientation="vertical" class="!bg-input" />

        <div class="flex-1">
          <FormField v-slot="{ setValue }" name="payPaymentType">
            <FormItem class="gap-0">
              <Label class="text-base w-fit">Способ оплаты</Label>
              <FormControl>
                <RadioList orientation="vertical">
                  <template #item="{ select, selected }">
                    <RadioButton
                      class="w-full text-sm h-12 gap-2"
                      v-for="p in paymentTypes"
                      :key="p.type"
                      :onSelect="() => setValue(select(p.type), true)"
                      :selected="p.type === selected"
                    >
                      <img :src="p.icon" :alt="p.type" width="24" height="24" />

                      {{ p.name }}
                    </RadioButton>
                  </template>
                </RadioList>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </div>
    </CardTitledContent>
  </form>
</template>
