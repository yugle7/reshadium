import { addId, subId } from "$lib";
import { getAuthor } from "$lib/user/data";

async function loadReacts(pb, talk) {
    const res = await pb.collection('reacts').getFullList({
        filter: `talk_id="${talk.id}"`
    });
    const reacts = {};
    res.forEach(({ message_id, react }) => (reacts[message_id] = react));
    return reacts;
}

async function loadTalk(pb, profile, user, chat) {
    const id = addId(profile.id, chat.id);
    let talk;

    try {
        talk = await pb.collection('talks').getOne(id);
        if (talk.message_id) await pb.collection('talks').update(id, { message_id: null });
        talk.reacts = await loadReacts(pb, talk);
    } catch (err) {
        console.log(err.message);

        talk = await pb.collection('talks').create({
            id,
            profile_id: profile.id,
            chat_id: chat.id,
            user: getAuthor(user),
            user_id: user.id
        });
        talk.reacts = {};
    }
    return talk;
}

async function loadMessages(pb, chat) {
    return await pb.collection('messages').getFullList({
        filter: `chat_id="${chat.id}"`,
        sort: 'created'
    });
}
async function loadChat(pb, profile, user) {
    const id = addId(profile.id, user.id);
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, chat);
    } catch (err) {
        console.log(err.message);

        chat = await pb.collection('chats').create({
            id,
            title: profile.username + ' – ' + user.username,
            type: 0,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

export async function load({ parent, url, locals }) {
    const pb = locals.pb;

    const profile = pb.authStore.model;
    if (!profile) return {};

    if (!url.searchParams.get('type')) return {};

    const { user } = await parent();
    if (!user) return {};

    const chat = await loadChat(pb, profile, user);
    const talk = await loadTalk(pb, profile, user, chat);

    return { chat, talk };
}

export const actions = {
    logout: async ({ locals }) => {
        locals.pb.authStore.clear();
    },
    friend: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const friend = data.get('friend') === 'true';
        const user_id = data.get('user_id');

        const id = subId(profile.id, user_id);
        try {
            if (friend) {
                await pb.collection('friends').create({ id, profile_id: profile.id, user_id });
                await pb.collection('users').update(profile.id, { 'friends+': 1 });
            } else {
                await pb.collection('friends').delete(id);
                await pb.collection('users').update(profile.id, { 'friends-': 1 });
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    email_visibility: async ({ request, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();

        const emailVisibility = data.get('email_visibility') === 'false';
        await pb.collection('users').update(profile.id, { emailVisibility });
    },
    role: async ({ request, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const id = data.get('id');
        const to = +data.get('to');

        const { role } = await pb.collection('users').getOne(id);
        if (profile.role <= Math.max(role, to)) return;

        await pb.collection('users').update(id, { to, wanted: null });
    },
    want: async ({ request, locals }) => {
        const pb = locals.pb;
        const { id, role, to, wanted } = pb.authStore.model;

        const data = await request.formData();
        const up = data.get('up') === 'true';

        await pb.collection('users').update(id, {
            role: up ? Math.min(role + 1, to) : role - !wanted,
            wanted: up && role == to ? new Date() : null
        });
    }
}