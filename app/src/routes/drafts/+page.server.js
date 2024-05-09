import { redirect, error } from '@sveltejs/kit';
import { default_params } from '$lib/draft/data';

async function loadReacts(pb, profile) {
    const res = await pb.collection('draft_reacts').getFullList({
        filter: `profile_id="${profile.id}"`
    });
    if (res.length) {
        const reacts = {};
        res.forEach(({ draft_id, react }) => (reacts[draft_id] = react));
        return reacts;
    }
}

async function loadDrafts(pb, profile, params) {
    const { sort, category, editor_id, problem_id, applied } = params;

    const filters = ['deleted=null', applied ? 'applied!=null' : 'applied=null'];

    if (category != null) filters.push(`categories~${category}`);
    if (editor_id) filters.push(`editor_id="${editor_id}"`);
    if (problem_id) filters.push(`problem_id="${problem_id}"`);

    const res = await pb.collection('drafts').getList(1, 1000, {
        filter: filters.join('&&'),
        sort
    });
    const drafts = res.items;

    const reacts = await loadReacts(pb, profile);
    if (reacts) drafts.forEach(d => (d.react = reacts[d.id]));

    return drafts;
}

export async function load({ locals, url }) {
    const pb = locals.pb;

    const profile = pb.authStore.model;
    if (!profile) throw redirect('/login');
    if (profile.role < 2) error(404, 'недоступно для обычных пользователей');

    const params = { ...default_params };
    for (const key of ['sort', 'category', 'editor_id', 'problem_id']) {
        params[key] = url.searchParams.get(key) || params[key];
    }
    params.applied = url.searchParams.get('applied') === 'true';

    return { profile, drafts: loadDrafts(pb, profile, params) };
}
