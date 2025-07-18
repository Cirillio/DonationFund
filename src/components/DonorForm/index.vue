<script lang="ts" setup>
import { ref, computed } from 'vue'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import donorSchema from '@/data/donorSchema'
import FormInput from '../form/FormInput.vue'
import { useCodeSelector, countries } from '@/composables/usePhonecodeSelector'

useForm({
  validationSchema: toTypedSchema(z.object(donorSchema)),
})

const { selected: phoneMaskSelected, currentMask: phoneMask } = useCodeSelector('RU')

const descVariants = ['Можете указать пожелания', 'Укажите список участников']

const groupCheck = ref()
const placeholder = computed(() => (groupCheck.value ? descVariants[1] : descVariants[0]))
const amounts = ref(['100,00', '500,00', '1 000,00', '2 500,00', '5 000,00', '10 000,00'])
const selam = ref()

// const onSubmit = handleSubmit(async (formValues) => {
//   console.log('Форма успешно отправлена! Способ оплаты:', formValues.paymentType)
//   // alert(`Привет, ${formValues.username}! Сумма пожертвования: ${formValues.amount} руб.`)

//   const request = {
//     amount: {
//       value: formValues.amount,
//       currency: 'RUB',
//     },
//     payment_method_data: {
//       type: formValues.paymentType,
//     },
//     capture: true,
//     confirmation: {
//       type: 'redirect',
//       return_url: 'http://localhost:5173/',
//     },
//     description: 'Заказ от ' + getCurrentFormattedDateTime(),
//   }

//   console.log(request)

//   try {
//     const response = await handlePayment(request)
//     window.location.href = response
//   } catch (error) {
//     console.error(error)
//   }
// })
</script>

<template>
  <div class="flex flex-col gap-2">
    <CardHeader class="">
      <CardTitle class="text-2xl">Форма пожертвования</CardTitle>
      <CardDescription class="text-base">Важен даже самый маленький вклад.</CardDescription>
    </CardHeader>
    <Separator class="bg-muted-foreground/25" />
    <CardContent>
      <form class="flex flex-col w-full gap-x-6 gap-y-2">
        <CardTitledContent
          title="Личная информация"
          desc="Пожалуйста, укажите свою личную информацию"
          icon="f7--person"
        >
          <section class="flex flex-col flex-1 gap-2">
            <!-- Phone -->
            <FormInput
              label="Телефон"
              type="tel"
              placeholder="Укажите номер телефона"
              name="phone"
              icon="f7--phone"
              :schema="donorSchema.phone"
              :mask="phoneMask"
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
                      @select="phoneMaskSelected = c"
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
              </template>
            </FormInput>
            <!-- Name -->
            <FormInput
              label="Имя (Пустое поле = аноним)"
              type="text"
              placeholder="Имя или ФИО"
              name="username"
              icon="f7--person"
              :schema="donorSchema.username"
            />
            <!-- Birth -->
            <FormInput
              label="Дата рождения"
              placeholder=""
              type="date"
              name="birth"
              icon="f7--calendar"
              :schema="donorSchema.birth"
            />
          </section>
        </CardTitledContent>

        <CardTitledContent title="Доп. информация" icon="f7--captions-bubble">
          <section class="flex flex-col flex-1 gap-2">
            <CheckBlock v-model="groupCheck" :icon="'f7--person-2'" label="От лица Группы" />
            <Textarea class="resize-none min-h-24 text-sm" id="desc" :placeholder="placeholder" />
          </section>
        </CardTitledContent>

        <CardTitledContent
          desc="Минимальная сумма пожертвования 100 рублей"
          title="Оплата"
          icon="f7--creditcard"
        >
          <section class="flex flex-1 flex-col gap-2">
            <FormInput
              label="Сумма пожертвования"
              type="text"
              placeholder="100,00"
              name="amount"
              :icon="'f7--money-rubl'"
              :schema="donorSchema.amount"
            />
            <RadioList v-model="selam">
              <template #item="{ select, selected }">
                <RadioButton
                  v-for="a in amounts"
                  :key="a"
                  :onSelect="() => select(a)"
                  :selected="selected === a"
                >
                  {{ a }}
                </RadioButton>
              </template>
            </RadioList>
          </section>
        </CardTitledContent>

        <Button type="button" class="w-fit ml-auto mt-auto cursor-pointer">Пожертвовать</Button>
      </form>
    </CardContent>
    <Separator class="bg-muted-foreground/25" />

    <CardFooter class="flex flex-col items-end gap-4 px-6 pb-2"> </CardFooter>
  </div>
</template>
