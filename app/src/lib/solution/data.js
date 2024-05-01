export const default_params = {
    sort: '-changed',
    solved: 1,
    reviewed: 0,
    status: '5',
    progress: '2'
}

export const solution_sort = {
    '-changed': 'Новые',
    'changed': 'Старые'
};


export const to_progress = [null, null, [3, 4, 5], [4, 5], [3, 5], [4]];

export const solution_progress = [
    'Смотрел',
    'Начал',
    'Отправил',
    'На проверке',
    'Не верно',
    'Зачтено'
];

export const getSolution = (solution) => {
    const { answer, proof, progress } = solution;
    return { answer, proof, progress };
}