<script lang="ts" setup generic="T">
import { ref, watch, computed, onMounted, onBeforeMount } from 'vue'
import { CurrencyDisplay } from 'vue-currency-input'
import { useFormConfig } from '@/composables/Donation/useFormConfig'
import { useDonationForm } from '@/composables/Donation/useDonationForm'
import {
  donorSchema,
  paymentAmounts,
  paymentTypes,
  phoneSpecs,
  placeholders,
} from '@/data/donation'
import { useStepperStore } from '@/stores/stepper.store'

const {
  phoneMask,
  phoneMaskSelected,
  currencyFormatted,
  currencyNumber,
  currencyRef,
  currencySet,
} = useFormConfig({
  phoneSelector: {
    _default: 'RU',
    phoneSpecs: phoneSpecs,
  },
  currencyOptions: {
    currency: 'RUB',
    currencyDisplay: CurrencyDisplay.hidden,
    precision: 2,
  },
})

const donationForm = useDonationForm({ schema: donorSchema }).createForm({
  initials: {
    donorPhone: phoneMaskSelected.value.code,
    donorGroup: false,
    donorAmount: 0,
  },
})

const amountsRef = ref()

watch(currencyNumber, (_new) => {
  const newAmount = _new || 0
  donationForm.resetField('donorAmount')
  donationForm.setFieldValue('donorAmount', newAmount, false)
  if (amountsRef.value.selected !== newAmount && amountsRef.value)
    amountsRef.value.select(undefined)
})

const stepper = useStepperStore()

const personalCompleted = computed(() => {
  return (
    donationForm.isFieldValid('donorPhone') &&
    donationForm.isFieldValid('donorName') &&
    donationForm.isFieldValid('donorBirth')
  )
})

const paymentCompleted = computed(() => {
  return donationForm.isFieldValid('donorPaymentType') && donationForm.isFieldValid('donorAmount')
})

stepper.initStepper({
  steps: [
    {
      name: 'personal',
      required: true,
      completed: personalCompleted,
      info: {},
    },
    {
      name: 'additional',
      required: false,
      completed: false,
      info: {},
    },
    {
      name: 'payment',
      required: true,
      completed: paymentCompleted,
      info: {},
    },
  ],
})
</script>

<template>
  <form
    v-auto-animate
    @submit.prevent="() => {}"
    class="flex flex-col w-full gap-x-6 gap-y-2 flex-1 min-w-0"
  >
    <CardTitledContent
      v-if="stepper.currentStep === 0"
      icon="f7--person"
      title="Личная информация"
      desc="Пожалуйста, укажите свою личную информацию"
    >
      <div class="flex flex-col w-full gap-2">
        <FormField
          v-slot="{ componentField, resetField }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorPhone"
        >
          <FormItem class="gap-0">
            <FormControl>
              <TypedInput
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
                        class="dark:hover:border-primary px-3 h-9 gap-2 justify-between w-fit"
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
          v-slot="{ componentField }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorName"
        >
          <FormItem class="gap-0">
            <FormControl>
              <TypedInput
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
          v-slot="{ componentField }"
          :validate-on-blur="!donationForm.isFieldDirty"
          name="donorBirth"
        >
          <FormItem class="gap-0">
            <FormControl>
              <TypedInput
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
      v-if="stepper.currentStep === 1"
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
                :placeholder="placeholders.get(donationForm.values.donorGroup || false)"
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
      v-if="stepper.currentStep === 2"
      icon="f7--creditcard"
      title="Оплата"
      desc="Минимальная сумма пожертвования 100 рублей"
    >
      <div class="flex flex-col w-full gap-2">
        <FormField v-slot="{ field, meta }" name="donorAmount">
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <TypedInput
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

        <FormField v-slot="{ setValue }" name="donorPaymentType">
          <Label class="text-base w-fit">Способ оплаты</Label>
          <FormItem v-auto-animate class="gap-0">
            <FormControl>
              <RadioList>
                <template #item="{ select, selected }">
                  <RadioButton
                    class="flex-1 text-base h-12 gap-2"
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
    </CardTitledContent>
  </form>
</template>
