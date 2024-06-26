import { addId } from "$lib";
import { loadMessages } from "$lib/chat/data";

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

async function loadChat(pb, discussion) {
    const { id, title } = discussion;
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, id);
    } catch (err) {
        console.log(err.message);

        chat = await pb.collection('chats').create({
            id,
            title,
            type: 1,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

export async function load({ parent, url, locals }) {
    const pb = locals.pb;

    if (!url.searchParams.get('type')) return {};

    const { discussion } = await parent();
    if (!discussion) return {};

    const chat = await loadChat(pb, discussion)

    const profile = pb.authStore.model;
    if (!profile) return { chat };

    const talk = await loadTalk(pb, profile.id, chat.id);
    return { chat, talk }
}


export const actions = {
    react: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const react = +data.get('react');

        const discussion_id = params.id;
        const id = addId(profile.id, discussion_id);

        try {
            const res = await pb.collection('discussion_reacts').getOne(id);

            if (res.react === react) return;
            await pb.collection('discussion_reacts').update(id, { react });

            const discussion = {};
            if (res.react > 0) discussion[res.react + '-'] = 1;
            if (react > 0) discussion[react + '+'] = 1;

            await pb.collection('discussions').update(discussion_id, discussion);

        } catch (err) {
            console.log(err.message);

            await pb.collection('discussion_reacts').create({
                id,
                react,
                profile_id: profile.id,
                discussion_id
            });
            await pb.collection('discussions').update(discussion_id, { [react + '+']: 1 });
        }
    }
}