export const default_params = {
    sort: '-rating',
    wanted: false,
    friend: false
};

export const user_role = [
    'Новичок',
    'Участник',
    'Модератор',
    'Админ',
    'Создатель'
];

export const user_sort = {
    '-rating': 'Лучшие',
    '-updated': 'Активные',
    '-created': 'Новые',
};

export const auth_provider = {
    'yandex': 'Яндекс',
    'google': 'Google'
};

export function getAuthor(user) {
    const { username, position } = user;
    if (position == null) return { username };
    return { username, position };
}

export const getAdmin = (username) => ({
    id: username.padStart(15, '0'),
    username,
    role: 3
});


export function getColor(position) {
    if (position == null) return 'var(--top-color)';
    if (position === 0) return 'rgb(128,128,128)';

    let r = 0;
    let g = 0;
    let b = 0;

    const s = 200;
    const p = 3;

    let k = (Math.log(Math.max(p, position)) / Math.log(p) - 1);

    if (k <= 1) {
        r = s;
        b = Math.floor(s * k);
    } else if (k <= 2) {
        r = Math.floor(s * (2 - k));
        b = s;
        g = Math.floor(s / 2 * (k - 1));
    } else if (k <= 3) {
        b = s;
        g = (s + Math.floor(s * (k - 2))) / 2;
    } else if (k <= 4) {
        b = Math.floor(s * (4 - k));
        g = s
    } else if (k <= 5) {
        r = Math.floor(s * (k - 4));
        g = s;
    } else {
        r = g = b = 128;
    }
    return `rgb(${r},${g},${b})`
}