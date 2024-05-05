import { default_params } from '$lib/problem/data';

async function loadProblems(pb, profile, params) {
    const { sort, category, weight, status, author_id, progress, rule } = params;

    const filters = [];
    if (weight != null) filters.push(`weight=${weight}`);
    if (status != null) filters.push(`status=${status}`);
    if (rule != null) filters.push(`rule=${rule}`);

    if (category != null) filters.push(`categories~'"${category}"'`);
    if (author_id) filters.push(`author_id="${author_id}"`);

    const problems = await pb.collection('problems').getFullList({
        filter: filters.join('&&'),
        sort
    });

    if (profile) {
        const res = await pb.collection('solutions').getFullList({
            filter: `author_id="${profile.id}"`
        });

        if (res.length) {
            const solutions = {};
            res.forEach(({ problem_id, progress, react }) => (solutions[problem_id] = { progress, react }));
            problems.forEach(p => {
                const { progress, react } = solutions[p.id] || {};
                p.progress = progress
                p.react = react;
            });
        }
        if (progress) {
            return problems.filter(p => (1 << p.progress) & progress);
        }
    }
    return problems;
}

export async function load({ locals, url }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const params = { ...default_params };
    for (const key of ['weight', 'category', 'author_id', 'rule']) params[key] = url.searchParams.get(key);

    const sort = url.searchParams.get('sort');
    if (sort) params.sort = sort;

    if (profile) {
        const status = url.searchParams.get('status');
        if (status != null && profile.role >= 2) params.status = parseInt(status);

        const progress = url.searchParams.get('progress');
        if (progress) params.progress = parseInt(progress);
    }
    return { profile, problems: loadProblems(pb, profile, params) };
}
