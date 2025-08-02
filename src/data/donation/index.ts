import { paymentAmounts } from './pay/amounts.data'
import { paymentTypes } from './pay/types.data'
import { phoneSpecs } from '../digits.data'
import { placeholders } from './blank/desc.placeholder.data'
import blankSchema from './blank/schema.data'
import paySchema from './pay/schema.data'
import { BlankSchema } from './blank/schema.data'
import { PaySchema } from './pay/schema.data'
import { DEFAULT_BLANK_FORM, DEFAULT_PAY_FORM } from './default.data'

export {
  phoneSpecs,
  paymentAmounts,
  paymentTypes,
  blankSchema,
  paySchema,
  placeholders,
  DEFAULT_BLANK_FORM,
  DEFAULT_PAY_FORM,
}

export type { BlankSchema, PaySchema }
