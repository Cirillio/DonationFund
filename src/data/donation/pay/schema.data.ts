import { z } from 'zod'
import { PaymentType } from '@/enums/payment'

const paySchema = z.object({
  payAmount: z
    .number('Пожалуйста, укажите сумму пожертвования.')
    .min(100, 'Указанная сумма меньше минимальной.'),

  payPaymentType: z.enum(PaymentType, 'Пожалуйста, укажите способ оплаты.'),
})

export default paySchema
export type PaySchema = z.infer<typeof paySchema>
