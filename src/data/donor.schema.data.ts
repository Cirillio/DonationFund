import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

const donorSchema = {
  donorPhone: z
    .string('Пожалуйста, укажите номер телефона.')
    .nonempty('Телефон обязателен для заполнения.')
    .refine((value) => {
      return isValidPhoneNumber(value)
    }, 'Номер указан неверно.'),

  donorName: z
    .string()
    .trim()
    .refine((value) => value.trim().length === 0 || value.trim().length >= 3, 'Хотя бы 3 символа.')
    .max(50, 'Имя должно быть не длиннее 50 символов.')
    .regex(/^[\p{L}\s-]*$/u, 'Имя может содержать только буквы, пробелы и тире.'),

  donorBirth: z.coerce
    .date('Пожалуйста, заполните дату рождения.')

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

  donorGroup: z.boolean(),
  donorDesc: z.string().trim(),

  donorAmount: z
    .number('Пожалуйста, укажите сумму пожертвования.')
    .min(100, 'Минимальная сумма пожертвования 100 рублей.'),

  donorPaymentType: z
    .string('Пожалуйста, укажите способ оплаты.')
    .nonempty('Тип платежа обязателен для выбора.'),
}

export default donorSchema
