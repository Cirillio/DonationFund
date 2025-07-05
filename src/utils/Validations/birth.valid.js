// const validations = [
//   {
//     reg: /^([А-Я][а-я]+) ([А-Я][а-я]+) ([А-Я][а-я]+)$/,
//     message: 'Имя должно быть в формате "Фамилия Имя Отчество"',
//   }, переделать конфиг др в конфиг json
// ]

export function birthValid(payload) {
  const { input, errors } = payload
  const birth = input.value
  errors.value = []

  const today = new Date()
  const birthDate = new Date(birth)

  if (isNaN(birthDate.getTime())) {
    errors.value.push('Дата рождения в неверном формате')
  }
  if (birthDate > today) {
    errors.value.push('Дата рождения не может быть в будущем')
  }
  if (today.getFullYear() - birthDate.getFullYear() < 18) {
    errors.value.push('Вы должны быть старше 18 лет')
  }

  if (birthDate.getFullYear() < 1900) {
    errors.value.push('Год рождения не может быть раньше 1900')
  }

  if (errors.value.length === 0) return birth
}
