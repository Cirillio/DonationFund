import { z } from 'zod'
import { isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js'

const donorSchema = {
  username: z
    .string()
    .refine((value) => value.trim().length === 0 || value.trim().length >= 3, 'Хотя бы 3 символа.')
    .max(50, 'Имя должно быть не длиннее 50 символов.')
    .regex(/^[\p{L}\s-]*$/u, 'Имя может содержать только буквы, пробелы и тире.'),

  birth: z.coerce
    .date('Пожалуйста, заполните дату рождения.')
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

  group: z.boolean(),
  desc: z.string(),

  phone: z
    .string('Пожалуйста, укажите номер телефона.')
    .nonempty('Телефон обязателен для заполнения.')
    .refine((value) => {
      return validatePhoneNumberLength(value) !== 'TOO_SHORT'
    }, 'Номер телефона слишком короткий.')
    .refine((value) => {
      return isValidPhoneNumber(value)
    }, 'Неверный формат номера'),

  amount: z
    .number('Пожалуйста, укажите сумму пожертвования.')
    .min(100, 'Минимальная сумма пожертвования 100 рублей.')
    .nonnegative('Сумма должна быть положительной.'),

  paymentType: z
    .string('Пожалуйста, укажите способ оплаты.')
    .nonempty('Тип платежа обязателен для выбора.'),
}

export default donorSchema
