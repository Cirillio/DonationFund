import { z } from 'zod'
import { PaymentType } from '@/enums/payment'

const paySchema = z.object({
  payAmount: z
    .number('Пожалуйста, укажите сумму пожертвования.')
    .min(100, 'Минимальная сумма пожертвования 100 рублей.'),

  payPaymentType: z.enum(PaymentType, 'Пожалуйста, укажите способ оплаты.'),
})

export default paySchema
