const normText = (text) => {
    text = text.toLowerCase().replaceAll('ё', 'е');
    text = text.replaceAll(/[^a-zа-я0-9-\^\&\%\=\!\+\*\/]/g, ' ');
    return ' ' + text.split(' ').filter((w) => w).join(' ') + ' ';
}

export const isProven = async (pb, problem, answer, proof) => {
    const rules = await pb.collection('rules').getFullList({
        filter: `problem_id="${problem.id}"`
    });
    if (!rules.length) return null;

    const text = normText(answer + ' ' + proof);
    for (const proven of [false, true]) {
        if (rules.filter(({ match }) => match == proven).some(({ regexp }) => text.match(' ' + regexp + ' '))) return proven;
    }
    return problem.rule > 1 ? false : null;
}
