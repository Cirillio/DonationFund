const validations = [
  {
    reg: /^([А-Я][а-я]+) ([А-Я][а-я]+) ([А-Я][а-я]+)$/,
    message: 'Имя должно быть в формате "Фамилия Имя Отчество"',
  },
]

export function nameValid(payload) {
  const { input, errors } = payload
  const name = input.value
  errors.value = []
  validations.forEach((valid) => {
    if (!valid.reg.test(name)) errors.value.push(valid.message)
  })
  if (errors.value.length === 0) return name
}
