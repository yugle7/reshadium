import { solution_progress } from '$lib/solution/data';

export const default_params = {
    sort: '-changed',
    status: 5
}

export const problem_sort = {
    '-changed': 'Новые',
    'changed': 'Старые',
    '-like': 'Лучшие'
};

export const problem_weight = [0, 1, 2, 3, 4, 5];
export const weight_name = ['Нулевки', 'Легкие', 'Простые', 'Обычные', 'Сложные', 'Тяжелые'];

export const problem_status = [
    'Черновик',
    'Предложена',
    'Архив',
    'Дубль',
    'Отбор',
    'Выложена'
];

export const problem_rule = [
    'Ручная проверка',
    'Частично вручную',
    'Проверка роботом'
];

export const problem_category = [
    'Теория вероятностей',
    'На смекалку',
    'Шахматы и шашки',
    'Загадки',
    'Программистам',
    'Математика',
    'Правдивцы и лжецы',
    'Геометрия',
    'Логика',
    'Детям',
    'Преферанс',
    'Игры',
    'Алгоритмы',
    'Последовательности',
    'Физика',
    'Взвешивания',
];

export const getTitle = (params) => {
    if (!params) return '';

    const { sort, status, weight, category, progress, author_id, search } = params;
    const names = [problem_sort[sort]];
    if (status != default_params.status) names.push(problem_status[status]);
    if (weight != null) names.push(weight_name[weight]);
    if (category != null) names.push(problem_category[category]);
    if (progress) names.push(solution_progress.filter((p, i) => progress & (1 << i)).join(', '));
    if (search) names.push('Поиск');
    if (author_id) names.push('Автор');
    return names.join(' – ');
};


export const getProblem = (problem) => {
    const { title, weight, categories, status } = problem;
    return { title, weight, categories, status };
}


