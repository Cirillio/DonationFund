export const validator = (rules) => {
  const errors = []
  return (value) => {
    for (const rule of rules) {
      if (!rule.test(value)) {
        errors.push(rule.message)
      }
    }
    return errors
  }
}

// формат:

// "rule" : {
//   test: (value) => value,
//   message: "error"
// }

// if (!/^8\d{10}$/.test(phone)) errors.push('Телефон должен начинаться с 8 и содержать 11 цифр')
// if (!/^\d+$/.test(phone)) errors.push('Телефон должен содержать только цифры')
// name: (value) => {
//   const errors = []
//   if (!/^[а-яё][а-яё]+\s[а-яё][а-яё]+\s[а-яё][а-яё]+$/.test(value.toLowerCase()))
//     errors.push('Формат: Фамилия Имя Отчество')
//   if (value.length > 100) errors.push('Макс. 100 символов')
//   return errors
// },

// birth: (value) => {
//   const errors = []
//   const age = calculateAge(value)
//   if (isNaN(new Date(value).getTime(0))) errors.push('Неверный формат даты')
//   if (age < 18) errors.push('Минимум 18 лет')
//   if (age > 100) errors.push('Максимум 100 лет')
//   return errors
// },
// amount: (value) => {
//   const errors = []
//   const trimmed = value.replaceAll(' ', '')
//   if (isNaN(trimmed)) errors.push('Сумма должна быть числом')
//   const _amount = parseFloat(trimmed)
//   if (_amount < 10 || trimmed == '') errors.push('Сумма должна быть не меньше 10 рублей')
//   return errors

function calculateAge(dateOfBirth) {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}
