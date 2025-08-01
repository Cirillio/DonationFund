import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

const blankSchema = z.object({
  blankPhone: z
    .string('Пожалуйста, укажите номер телефона.')
    .nonempty('Телефон обязателен для заполнения.')
    .refine((value) => {
      return isValidPhoneNumber(value)
    }, 'Номер указан неверно.'),

  blankName: z
    .string()
    .trim()
    .refine((value) => value.trim().length === 0 || value.trim().length >= 3, 'Хотя бы 3 символа.')
    .max(50, 'Имя должно быть не длиннее 50 символов.')
    .regex(/^[\p{L}\s-]*$/u, 'Имя может содержать только буквы, пробелы и тире.')
    .optional(),

  blankBirth: z.coerce
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

  blankGroup: z.boolean().optional(),
  blankDesc: z.string().trim().optional(),
})

export default blankSchema
