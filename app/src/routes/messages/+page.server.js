import { addId } from '$lib';
import { getAuthor } from '$lib/user/data';
import { updateTalks } from '$lib/message/data';

export const actions = {
    send: async ({ request, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();

        const message = JSON.parse(data.get('message'));



        const author_id = profile.id;
        const author = getAuthor(profile);

        const { id, chat_id, text, created } = message.id
            ? await pb.collection('messages').update(message.id, message)
            : await pb.collection('messages').create({
                ...message,
                author_id,
                author
            });
        message.id = id;

        const { updated, sent, type } = await pb.collection('chats').update(chat_id, {
            message: { text, author },
            message_id: id,
            sender_id: author_id,
            changed: created,
            'sent+': 1
        });

        const talk_id = addId(author_id, chat_id);
        const { user_id } = await pb.collection('talks').update(talk_id, { read: sent });

        if (user_id && sent === 1) {
            const talk_id = addId(user_id, chat_id);
            try {
                await pb.collection('talks').create(talk_id, {
                    profile_id: user_id,
                    chat_id,
                    user_id: author_id,
                    user: author
                });
            } catch (err) {
                console.log(err.message);
            }
        }
        if (type === 1) {
            await pb.collection('discussions').update(chat_id, { 'messages+': 1, changed: updated });
        }

        await updateTalks(pb, profile, message);
    }
}