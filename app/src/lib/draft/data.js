export const default_params = {
    sort: '-changed',
    applied: 0
}

export const draft_sort = {
    '-changed': 'Новые',
    'changed': 'Старые',
    '-like': 'Лучшие',
    'like': 'Худшие'
};


export const getDraft = (problem) => {
    const { title, categories, condition, notes, answer, proof } = problem;
    return { title, categories, condition, notes, answer, proof };
};