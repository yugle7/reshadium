import { redirect } from '@sveltejs/kit';

async function loadChats(pb, profile) {
    const res = await pb.collection('talks').getFullList({
        filter: `profile_id="${profile.id}"&&deleted!=true`,
        expand: 'chat_id'
    });
    return res.map((talk) => {
        const { expand } = talk;
        delete talk.expand;
        return { ...expand.chat_id, talk };
    });
}

export async function load({ locals }) {
    const pb = locals.pb;

    const profile = pb.authStore.model;
    if (!profile) throw redirect(303, '/login');

    return { profile, chats: loadChats(pb, profile) };
}
