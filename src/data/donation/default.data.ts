import { BlankSchema } from './blank/schema.data'
import { PaySchema } from './pay/schema.data'

const DEFAULT_BLANK_FORM: Partial<BlankSchema> = {
  blankName: '',
  blankPhone: '',
  blankBirth: '',
  blankGroup: false,
  blankDesc: '',
}

const DEFAULT_PAY_FORM: Partial<PaySchema> = {
  payAmount: 0,
  payPaymentType: undefined,
}

export { DEFAULT_BLANK_FORM, DEFAULT_PAY_FORM }
