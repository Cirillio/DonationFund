export function useCurrency() {
  const currencyToNumber = (value: string | null): number | null => {
    try {
      if (typeof value === null) return null
      return Number(value?.replace(/\s/g, '').replace(',', '.'))
    } catch (e) {
      throw new Error('Ошибка конвертации: ' + e)
    }
  }

  const equel = (...args: any) =>
    args.every((arg: any) => currencyToNumber(arg) === currencyToNumber(args[0]))

  return { currencyToNumber, equel }
}
