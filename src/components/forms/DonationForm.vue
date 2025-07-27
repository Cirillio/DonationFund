<script lang="ts" setup generic="T">
import { defineExpose, ref, watch } from 'vue'
import { FormField } from '@/components/ui/form'
import { useDonationForm } from '@/composables/Donation/useDonationForm'
import { useCodeSelector } from '@/composables/usePhonecodeSelector'
import { phoneSpecs } from '@/data/number.data'
import { CurrencyDisplay, useCurrencyInput } from 'vue-currency-input'
import { useCurrency } from '@/composables/useCurrency'
import donorSchema from '@/data/donation/donation.schema.data'

import sbp_icon from '@/assets/icons/payment/SBP.svg'
import bankcard_icon from '@/assets/icons/payment/bankcard.svg'

// *
const { currencyToNumber } = useCurrency()
// *
const { selected: phoneMaskSelected, currentMask: phoneMask } = useCodeSelector({
  _default: 'RU',
  phoneSpecs: phoneSpecs,
})

const donationForm = useDonationForm({ schema: donorSchema }).createForm({
  initials: {
    donorAmount: 0,
    donorGroup: false,
    donorPhone: phoneMaskSelected.value.code,
  },
})

// *
const descPlaceholders = ['Можете указать пожелания', 'Укажите список участников']

// *
const {
  inputRef: currencyRef,
  formattedValue: currencyFormatted,
  numberValue: currencyNumber,
  setValue: currencySet,
} = useCurrencyInput({
  currency: 'RUB',
  currencyDisplay: CurrencyDisplay.hidden,
  precision: 2,
})

const amountsRef = ref()

// *
const amountExamples = ['100,00', '500,00', '1 000,00', '2 500,00', '5 000,00', '10 000,00']

// *
const payments = [
  {
    type: 'sbp',
    name: 'СБП',
    icon: sbp_icon,
  },
  {
    type: 'bankcard',
    name: 'Картой онлайн',
    icon: bankcard_icon,
  },
]

watch(currencyNumber, (_new) => {
  const newAmount = _new || 0
  donationForm.resetField('donorAmount')
  donationForm.setFieldValue('donorAmount', newAmount, false)
  if (currencyToNumber(amountsRef.value.selected) !== newAmount) amountsRef.value.select(undefined)
})

defineExpose({ fields: donationForm.values })
</script>

<template>
  <form @submit.prevent="() => {}" class="flex flex-col w-full gap-x-6 gap-y-2 flex-1 min-w-0">
    <CardTitledContent
      icon="f7--person"
      title="Личная информация"
      desc="Пожалуйста, укажите свою личную информацию"
    >
      <div class="flex flex-col w-full gap-2">
        <FormField
          v-slot="{ componentField, resetField, meta }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorPhone"
        >
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <TypedInput
                :aria-valid="meta.dirty && meta.validated && !meta.pending ? meta.valid : undefined"
                v-mask="phoneMask"
                v-bind="componentField"
                icon="f7--phone"
                label="Телефон"
                placeholder="Укажите номер телефона"
                name="donorPhone"
                type="text"
              >
                <template #actionButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button
                        :variant="'outline'"
                        class="dark:hover:border-primary px-3 h-full gap-2 justify-between w-fit focus:!ring-[3px] focus:ring-ring/50 focus:!border-ring"
                      >
                        <span v-if="phoneMaskSelected" class="text-base">{{
                          phoneMaskSelected.icon
                        }}</span>
                        <span v-else class="text-sm text-muted-foreground">Select</span>
                        <span class="iconify f7--chevron-down text-muted-foreground size-4"></span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      :align="'end'"
                      class="min-w-[var(--radix-dropdown-menu-trigger-width)] gap-1 flex flex-col"
                    >
                      <DropdownMenuItem
                        v-for="spec in phoneSpecs"
                        :key="spec.id"
                        @select="
                          () => {
                            phoneMaskSelected = spec
                            resetField({ value: spec.code })
                          }
                        "
                        class="flex hover:!bg-input/50 hover:shadow-xs transition-all items-center px-2 py-1 text-sm gap-2"
                        :class="{
                          'bg-muted hover:!bg-muted shadow-xs':
                            phoneMaskSelected.code === spec.code,
                        }"
                      >
                        <span class="text-base">{{ spec.icon }}</span>
                        <span>{{ spec.name }}</span>
                        <span class="ml-auto text-muted-foreground">{{ spec.code }}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </template>
              </TypedInput>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField, meta }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorName"
        >
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <TypedInput
                :aria-valid="meta.dirty && meta.validated && !meta.pending ? meta.valid : undefined"
                v-bind="componentField"
                icon="f7--person"
                label="Имя"
                placeholder="Пустая строка = Аноним"
                name="donorName"
                type="text"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField, meta }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorBirth"
        >
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <TypedInput
                :aria-valid="meta.dirty && meta.validated && !meta.pending ? meta.valid : undefined"
                v-bind="componentField"
                icon="f7--calendar"
                label="Дата рождения"
                name="donorBirth"
                type="date"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </CardTitledContent>

    <CardTitledContent
      icon="f7--gear-alt"
      title="Дополнительная информация"
      desc="Укажите что считаете важным"
    >
      <div class="flex flex-col w-full gap-2">
        <FormField
          v-slot="{ componentField }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorGroup"
        >
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <CheckBlock
                class="w-full"
                v-bind="componentField"
                label="От лица Группы"
                icon="f7--person-2"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorDesc"
        >
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <Textarea
                :placeholder="descPlaceholders[donationForm.values.donorGroup ? 1 : 0]"
                v-bind="componentField"
                class="resize-none min-h-24 text-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </CardTitledContent>

    <CardTitledContent
      icon="f7--creditcard"
      title="Оплата"
      desc="Минимальная сумма пожертвования 100 рублей"
    >
      <div class="flex flex-col w-full gap-2">
        <FormField v-slot="{ field, meta }" name="donorAmount">
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <TypedInput
                :aria-valid="meta.dirty && meta.validated && !meta.pending ? meta.valid : undefined"
                @blur="(e: Event) => (meta.dirty ? field.onBlur(e) : undefined)"
                ref="currencyRef"
                :value="currencyFormatted"
                icon="f7--money-rubl"
                label="Сумма пожертвования"
                placeholder="100,00"
                name="donorAmount"
                type="text"
              />
              <FormMessage />

              <RadioList class="mt-1" ref="amountsRef">
                <template #item="{ select, selected }">
                  <RadioButton
                    v-for="a in amountExamples"
                    :key="a"
                    :onSelect="() => currencySet(currencyToNumber(select(a) as string | null))"
                    :selected="a === selected"
                  >
                    {{ a }}
                  </RadioButton>
                </template>
              </RadioList>
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ setValue }" name="donorPaymentType">
          <Label class="text-base w-fit">Способ оплаты</Label>
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <RadioList>
                <template #item="{ select, selected }">
                  <RadioButton
                    class="flex-1 h-16 gap-2"
                    v-for="p in payments"
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
    </CardTitledContent>
  </form>
</template>
