
export const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export const getNow = () => {
    const date = new Date();
    return toIntDate(date.getFullYear(), date.getMonth(), date.getDate());
};

const daysInMonth = (year, month) => {
    month++;
    if (month === 12) {
        year++;
        month = 0;
    }
    return new Date(year, month, 0).getDate();
};

const getDates = (year, month) => {
    const dates = new Array(getWeekday(year, month, 1)).fill({});

    const days = daysInMonth(year, month);
    for (let day = 1; day <= days; day++) {
        const today = toIntDate(year, month, day);
        dates.push({ day, today });
    }
    return dates;
};

export const getCalendar = (now) => {
    let year = Math.floor(now / 10000);
    let month = Math.floor(now / 100) % 100 - 1;

    const calendar = [];
    for (let i = 0; i < 3; i++) {
        calendar.push({
            year: !month && year,
            month: months[month],
            dates: getDates(year, month)
        });
        month++;
        if (month === 12) {
            year++;
            month = 0;
        }
    }
    return calendar;
};

export const toIntDate = (year, month, day) => 10000 * year + 100 * (month + 1) + day;
export const toStrDate = (time) => time.substring(8, 10) + '.' + time.substring(5, 7) + '.' + time.substring(2, 4);

const intToDate = (date) => {
    const year = Math.floor(date / 10000);
    const month = (Math.floor(date / 100) % 100) - 1;
    const day = date % 100;
    return new Date(year, month, day);
}

export const getDays = (start, finish) => Math.ceil((intToDate(finish) - intToDate(start)) / 86400000);
export const getWeekday = (year, month, day) => (new Date(year, month, day).getDay() + 6) % 7;

export const getDate = (date) => {
    const day = date % 100;
    if (day > 0 && day <= 28) return date;
    const year = Math.floor(date / 10000);
    const month = Math.floor(date / 100) % 100;
    date = new Date(year, month - 1, day);
    return toIntDate(date.getFullYear(), date.getMonth(), date.getDate());
}


export const asDay = (time) => +time.substring(6, 8) + ' ' + months[time.substring(4, 6) - 1];


export const day_type = ['Рабочий', 'Выходной', 'Долгий выходной', 'Праздник'];

export let holidays = {
    '20240101': 1,
    '20240102': 1,
    '20240103': 1,
    '20240104': 1,
    '20240105': 1,
    '20240106': 1,
    '20240107': 1,
    '20240108': 1,
    '20240113': 1,
    '20240114': 1,
    '20240120': 1,
    '20240121': 1,
    '20240127': 1,
    '20240128': 1,
    '20240203': 1,
    '20240204': 1,
    '20240210': 1,
    '20240211': 1,
    '20240217': 1,
    '20240218': 1,
    '20240223': 1,
    '20240224': 1,
    '20240225': 1,
    '20240302': 1,
    '20240303': 1,
    '20240308': 1,
    '20240309': 1,
    '20240310': 1,
    '20240316': 1,
    '20240317': 1,
    '20240323': 1,
    '20240324': 1,
    '20240330': 1,
    '20240331': 1,
    '20240406': 1,
    '20240407': 1,
    '20240413': 1,
    '20240414': 1,
    '20240420': 1,
    '20240421': 1,
    '20240428': 1,
    '20240429': 1,
    '20240430': 1,
    '20240501': 3,
    '20240504': 1,
    '20240505': 1,
    '20240509': 1,
    '20240510': 1,
    '20240511': 1,
    '20240512': 1,
    '20240518': 1,
    '20240519': 1,
    '20240525': 1,
    '20240526': 1,
    '20240601': 1,
    '20240602': 1,
    '20240608': 1,
    '20240609': 1,
    '20240612': 1,
    '20240615': 1,
    '20240616': 1,
    '20240622': 1,
    '20240623': 1,
    '20240629': 1,
    '20240630': 1,
    '20240706': 1,
    '20240707': 1,
    '20240713': 1,
    '20240714': 1,
    '20240720': 1,
    '20240721': 1,
    '20240727': 1,
    '20240728': 1,
    '20240803': 1,
    '20240804': 1,
    '20240810': 1,
    '20240811': 1,
    '20240817': 1,
    '20240818': 1,
    '20240824': 1,
    '20240825': 1,
    '20240831': 1,
    '20240901': 1,
    '20240907': 1,
    '20240908': 1,
    '20240914': 1,
    '20240915': 1,
    '20240921': 1,
    '20240922': 1,
    '20240928': 1,
    '20240929': 1,
    '20241005': 1,
    '20241006': 1,
    '20241012': 1,
    '20241013': 1,
    '20241019': 1,
    '20241020': 1,
    '20241026': 1,
    '20241027': 1,
    '20241103': 1,
    '20241104': 1,
    '20241109': 1,
    '20241110': 1,
    '20241116': 1,
    '20241117': 1,
    '20241123': 1,
    '20241124': 1,
    '20241130': 1,
    '20241201': 1,
    '20241207': 1,
    '20241208': 1,
    '20241214': 1,
    '20241215': 1,
    '20241221': 1,
    '20241222': 1,
    '20241229': 1,
    '20241230': 1,
    '20241231': 1
};