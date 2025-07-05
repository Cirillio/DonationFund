import { phoneValid } from './phone.valid'
import { nameValid } from './name.valid'
import { birthValid } from './birth.valid'

const validator = {
  phone: phoneValid,
  name: nameValid,
  birth: birthValid,
}

export default validator
