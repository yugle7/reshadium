
export const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const getTime = (time) => time.substring(0, 10) + ' ' + new Date(time + ' GMT').toLocaleTimeString();
