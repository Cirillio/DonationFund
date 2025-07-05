const validations = [
  {
    reg: /^8\d{10}$/,
    message: 'Телефон должен начинаться с 8 и содержать 11 цифр',
  },
  {
    reg: /^\d+$/,
    message: 'Телефон должен содержать только цифры',
  },
]

export function phoneValid(payload) {
  const { input, errors } = payload
  const phone = input.value
  errors.value = []
  validations.forEach((valid) => {
    if (!valid.reg.test(phone)) errors.value.push(valid.message)
  })
  if (errors.value.length === 0) return phone
}
