<script lang="ts" setup>
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import PersonalContent from './PersonalContent.vue'
import OptionalContent from './OptionalContent.vue'
import PaymentContent from './PaymentContent.vue'

const donorSchema = z.object({
  phone: z.string().nonempty('Телефон обязателен для заполнения.'),
  username: z
    .string()
    .refine((value) => value.trim().length === 0 || value.trim().length >= 3, 'Хотя бы 3 символа.')
    .max(50, 'Имя должно быть не длиннее 50 символов.')
    .regex(/^[\p{L}\s-]*$/u, 'Имя может содержать только буквы, пробелы и тире.'),

  birth: z.coerce
    .date({
      invalid_type_error: 'Неверный формат даты рождения.',
      required_error: 'Дата рождения обязательна для заполнения.',
    } as z.core.$ZodNumberParams)
    .min(new Date('1900-01-01'), 'Дата рождения слишком ранняя (минимум 1900 год).')
    .max(new Date(), 'Дата рождения не может быть в будущем.')
    .refine((date: string | Date) => {
      const today = new Date()
      const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      return date <= eighteenYearsAgo
    }, 'Вам должно быть не менее 18 лет.')
    .refine((date: string | Date) => {
      const today = new Date()
      const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
      return date >= hundredYearsAgo
    }, 'Возраст не может быть больше 100 лет.'),

  amount: z
    .number({
      invalid_type_error: 'Сумма должна быть числом.',
      required_error: 'Сумма обязательна.',
    } as z.core.$ZodNumberParams)
    .min(100, 'Минимальная сумма пожертвования 100 рублей.')
    .nonnegative('Сумма должна быть положительной.'),

  paymentType: z.string().nonempty('Тип платежа обязателен для заполнения.'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(donorSchema),
  initialValues: {
    phone: undefined,
    username: '',
    birth: undefined,
    amount: undefined,
    paymentType: undefined,
  },
})

const onSubmit = handleSubmit((formValues) => {
  console.log('Форма успешно отправлена! Значения:', formValues)
  alert(`Привет, ${formValues.username}! Сумма пожертвования: ${formValues.amount} руб.`)
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <CardHeader class="">
      <CardTitle class="text-2xl">Форма пожертвования</CardTitle>
      <CardDescription class="text-base">Важен даже самый маленький вклад.</CardDescription>
    </CardHeader>
    <Separator />
    <CardContent>
      <form class="flex flex-col w-full gap-x-6 gap-y-2">
        <PersonalContent />
        <OptionalContent />
        <PaymentContent />
        <Button @click="onSubmit" type="button" class="w-fit ml-auto mt-auto cursor-pointer"
          >Пожертвовать</Button
        >
      </form>
    </CardContent>
    <Separator />

    <CardFooter class="flex flex-col items-end gap-4 px-6 pb-2"> </CardFooter>
  </div>
</template>
