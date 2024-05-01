import { VK_TOKEN, VK_VERSION, VK_URL } from '$env/static/private'

const normText = (text) => {
    text = text.toLowerCase().replaceAll('ё', 'е');
    text = text.replaceAll(/[^a-zа-я0-9-\^\&\%\=\!\+\*\/]/g, ' ');
    return ' ' + text.split(' ').filter((w) => w).join(' ') + ' ';
}

export const isProven = async (pb, solution, rule) => {
    const { problem_id, answer, proof } = solution;
    const rules = await pb.collection('rules').getFullList({
        filter: `problem_id="${problem_id}"`
    });
    if (!rules.length) return null;

    const text = normText(answer + ' ' + proof);
    for (const proven of [false, true]) {
        if (rules.filter(({ match }) => match == proven).some(({ regexp }) => regexp && text.match(regexp))) return proven;
    }
    return !rule || null;
}
