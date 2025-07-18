export function getCurrentFormattedDateTime() {
  const now = new Date(); // Создаем новый объект Date с текущим временем

  // Получаем компоненты даты
  const day = String(now.getDate()).padStart(2, '0'); // День (добавляем '0' спереди, если меньше 10)
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяц (getMonth() возвращает 0-11, поэтому +1)
  const year = now.getFullYear(); // Год

  // Получаем компоненты времени
  const hours = String(now.getHours()).padStart(2, '0'); // Часы
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Минуты

  // Собираем строку в нужном формате
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
