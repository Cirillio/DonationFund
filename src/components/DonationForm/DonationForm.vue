<script lang="ts" setup generic="T">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import donorSchema from '@/data/donor.schema.data'
import CustomInput from '../form/CustomInput.vue'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useCodeSelector, countries } from '@/composables/usePhonecodeSelector'
import { CurrencyDisplay } from 'vue-currency-input'
import { useCurrencyInput } from 'vue-currency-input'
import { useCurrency } from '@/composables/useCurrency'
import { defineExpose } from 'vue'
import { ref } from 'vue'
const { currencyToNumber } = useCurrency()

const { selected: phoneMaskSelected, currentMask: phoneMask } = useCodeSelector('RU')

const donationForm = useForm({
  validationSchema: toTypedSchema(z.object(donorSchema)),
  initialValues: {
    donorPhone: phoneMaskSelected.value.code,
    donorGroup: false,
    donorAmount: 0,
  },
})

const descPlaceholders = ['Можете указать пожелания', 'Укажите список участников']

const { inputRef: currencyRef, formattedValue: currencyFormatted } = useCurrencyInput({
  currency: 'RUB',
  currencyDisplay: CurrencyDisplay.hidden,
  precision: 2,
})

const amountsRef = ref()

const amountExamples = ['100,00', '500,00', '1 000,00', '2 500,00', '5 000,00', '10 000,00']

const payments = [
  {
    type: 'sbp',
    name: 'СБП',
    icon: 'SBP.svg',
  },
  {
    type: 'bankcard',
    name: 'Картой онлайн',
    icon: 'bankcard.svg',
  },
]

defineExpose({ fields: donationForm.values })
</script>

<template>
  <form class="flex flex-col w-full gap-x-6 gap-y-2 flex-1 min-w-0">
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
          <FormItem v-auto-animate>
            <FormControl>
              <CustomInput
                :validField="meta.dirty ? meta.valid : undefined"
                v-mask="phoneMask"
                v-bind="componentField"
                icon="f7--phone"
                label="Телефон"
                placeholder="Укажите номер телефона"
                name="donoPhone"
                type="text"
              >
                <template #actionButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button
                        :variant="'outline'"
                        class="dark:hover:border-primary h-full gap-2 justify-between w-fit"
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
                        v-for="c in countries"
                        :key="c.id"
                        @select="
                          () => {
                            phoneMaskSelected = c
                            resetField({ value: c.code })
                          }
                        "
                        class="flex hover:!bg-input/50 hover:shadow-xs transition-all items-center px-2 py-1 text-sm gap-2"
                        :class="{
                          'bg-muted hover:!bg-muted shadow-xs': phoneMaskSelected.code === c.code,
                        }"
                      >
                        <span class="text-base">{{ c.icon }}</span>
                        <span>{{ c.name }}</span>
                        <span class="ml-auto text-muted-foreground">{{ c.code }}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </template></CustomInput
              >
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField, meta }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorName"
        >
          <FormItem v-auto-animate>
            <FormControl>
              <CustomInput
                :validField="meta.dirty ? meta.valid : undefined"
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
          <FormItem v-auto-animate>
            <FormControl>
              <CustomInput
                :validField="meta.dirty ? meta.valid : undefined"
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
          <FormItem v-auto-animate>
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
          <FormItem v-auto-animate>
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
        <FormField v-slot="{ handleBlur, setValue }" name="donorAmount">
          <FormItem v-auto-animate>
            <FormControl>
              <CustomInput
                @input="
                  () => {
                    setValue(currencyToNumber(currencyFormatted) || 0, false)
                    amountsRef.select(undefined)
                  }
                "
                @blur="handleBlur"
                ref="currencyRef"
                :value="currencyFormatted"
                icon="f7--money-rubl"
                label="Сумма пожертвования"
                placeholder="100,00"
                name="donorAmount"
                type="text"
              />
              <FormMessage />

              <RadioList ref="amountsRef">
                <template #item="{ select, selected }">
                  <RadioButton
                    v-for="a in amountExamples"
                    :key="a"
                    :onSelect="
                      () => {
                        const newSelected = select(a) as string | null
                        setValue(currencyToNumber(newSelected) || 0, true)
                        currencyFormatted = newSelected
                      }
                    "
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
          <FormItem v-auto-animate>
            <FormControl>
              <RadioList>
                <template #item="{ select, selected }">
                  <RadioButton
                    v-for="p in payments"
                    :key="p.type"
                    :onSelect="() => setValue(select(p.type), true)"
                    :selected="p.type === selected"
                  >
                    <img
                      :src="'../../../public/ico/' + p.icon"
                      :alt="p.type"
                      width="24"
                      height="24"
                    />

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
