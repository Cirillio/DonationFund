import { PaymentType } from '@/enums/payment'

export type Payment = {
  type: PaymentType
  name: string
  icon: string
}
