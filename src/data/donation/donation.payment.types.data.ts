import { Payment } from '@/types/payment'
import sbp_icon from '@/assets/icons/payment/SBP.svg'
import bankcard_icon from '@/assets/icons/payment/bankcard.svg'

export const paymentTypes: Payment[] = [
  {
    type: 'sbp',
    name: 'СБП',
    icon: sbp_icon,
  },
  {
    type: 'bankcard',
    name: 'Картой онлайн',
    icon: bankcard_icon,
  },
]
