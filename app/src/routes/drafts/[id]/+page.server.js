import { addId } from "$lib";
import { getDraft } from "$lib/draft/data";

async function loadReacts(pb, talk_id) {
    const res = await pb.collection('reacts').getFullList({
        filter: `talk_id="${talk_id}"`
    });
    const reacts = {};
    res.forEach((r) => (reacts[r.message_id] = r.react));
    return reacts;
}

async function loadTalk(pb, profile_id, chat_id) {
    const id = addId(profile_id, chat_id);
    let talk;

    try {
        talk = await pb.collection('talks').getOne(id);
        if (talk.message_id) await pb.collection('talks').update(id, { message_id: null });
        talk.reacts = await loadReacts(pb, id);
    } catch (err) {
        console.log(err.message);

        talk = await pb.collection('talks').create({
            id,
            profile_id,
            chat_id,
            deleted: true
        });
        talk.reacts = {};
    }
    return talk;
}

async function loadMessages(pb, chat_id) {
    return await pb.collection('messages').getFullList({
        filter: `chat_id="${chat_id}"`,
        sort: 'created'
    });
}

async function loadChat(pb, draft) {
    const { id, title } = draft;
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, id);
    } catch (err) {
        console.log(err.message);

        chat = await pb.collection('chats').create({
            id,
            title,
            type: 8,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

export async function load({ parent, url, locals }) {
    const pb = locals.pb;

    const profile = pb.authStore.model;
    if (!profile) throw redirect('/login');

    if (!url.searchParams.get('type')) return {};

    const { draft } = await parent();
    const chat = await loadChat(pb, draft)

    if (!profile) return { chat };

    const talk = await loadTalk(pb, profile.id, chat.id);
    return { chat, talk }
}


export const actions = {
    edit: async ({ request, params, locals }) => {
        const pb = locals.pb;

        const data = await request.formData();
        await pb.collection('drafts').update(params.id, {
            title: data.get('title'),
            condition: data.get('condition'),
            notes: data.get('notes'),
            answer: data.get('answer'),
            proof: data.get('proof'),
            categories: data.getAll('categories'),
            changed: new Date()
        });
    },
    apply: async ({ params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const { id } = params;
        const draft = await pb.collection('drafts').getOne(id, { expand: 'problem_id' });

        const { applied, problem_id } = await pb.collection('drafts').update(id, {
            applied: new Date(),
            problem: getDraft(draft.expand.problem_id)
        });
        await pb.collection('problems').update(problem_id, {
            ...getDraft(draft),
            changed: applied,
            'drafts-': 1
        });
        await pb.collection('users').update(profile.id, { 'drafts-': 1 });
    },
    cancel: async ({ params, locals }) => {
        const pb = locals.pb;

        const draft = await pb.collection('drafts').getOne(params.id);
        const { problem_id, problem, applied, editor_id } = draft;

        if (applied) {
            const { changed } = await pb.collection('problems').getOne(problem_id);
            if (changed === applied) {
                await pb.collection('problems').update(problem_id, {
                    ...problem,
                    changed: new Date(),
                    'drafts+': 1
                });
            }
            await pb.collection('drafts').update(draft.id, { applied: null });
            await pb.collection('users').update(editor_id, { 'drafts+': 1 });
        }
    },
    delete: async ({ params, locals }) => {
        const pb = locals.pb;

        const { problem_id, editor_id } = await pb.collection('drafts').update(params.id, { deleted: new Date() });

        await pb.collection('problems').update(problem_id, { 'drafts-': 1 });
        await pb.collection('users').update(editor_id, { 'drafts-': 1 });
    },
    restore: async ({ params, locals }) => {
        const pb = locals.pb;

        const { problem_id, editor_id } = await pb.collection('drafts').update(params.id, { deleted: null });

        await pb.collection('problems').update(problem_id, { 'drafts+': 1 });
        await pb.collection('users').update(editor_id, { 'drafts+': 1 });
    },
    react: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const react = data.get('react');

        const draft_id = params.id;
        const id = addId(profile.id, draft_id);

        try {
            const res = await pb.collection('draft_reacts').getOne(id);

            if (res.react === react) return;
            await pb.collection('draft_reacts').update(id, { react });

            const draft = {};
            if (res.react > 0) draft[res.react + '-'] = 1;
            if (react > 0) draft[react + '+'] = 1;
            await pb.collection('drafts').update(draft_id, draft);

        } catch (err) {
            console.log(err.message);

            await pb.collection('draft_reacts').create({
                id,
                react,
                profile_id: profile.id,
                draft_id
            });
            await pb.collection('drafts').update(draft_id, { [react + '+']: 1 });
        }
    }
}