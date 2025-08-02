import { Payment } from '@/types/payment.type'
import { PaymentType } from '@/enums/payment'
import sbp_icon from '@/assets/icons/payment/SBP.svg'
import bankcard_icon from '@/assets/icons/payment/bankcard.svg'

export const paymentTypes: Payment[] = [
  {
    type: PaymentType.SBP,
    name: 'СБП',
    icon: sbp_icon,
  },
  {
    type: PaymentType.BANKCARD,
    name: 'Картой онлайн',
    icon: bankcard_icon,
  },
]
