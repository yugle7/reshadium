import { addId } from '$lib';
import { updateTalks } from '$lib/message/data';


export const actions = {
    delete: async ({ request, params, locals }) => {
        const pb = locals.pb;
        
        const data = await request.formData();
        const deleted = data.get('deleted') === 'true';

        try {
            await pb.collection('messages').update(params.id, { deleted });
        } catch (err) {
            console.log(err.message);
        }
    },
    append: async ({ request, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const { id, text, chat_id, author } = JSON.parse(data.get('message'));

        const { updated } = await pb.collection('messages').update(id, { text });

        await pb.collection('chats').update(chat_id, {
            message: { text, author },
            changed: updated
        });
        await updateTalks(pb, profile, message);
    },
    edit: async ({ request, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const { id, text, reply, chat_id, author } = JSON.parse(data.get('message'));

        const { updated } = await pb.collection('messages').update(id, { text, reply });
        const { message_id } = await pb.collection('chats').getOne(chat_id);

        if (message_id === id) {
            await pb.collection('chats').update(chat_id, {
                message: { text, author },
                reply,
                changed: updated
            });
            await updateTalks(pb, profile, message);
        }
    },
    react: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const data = await request.formData();
        const react = data.get('react');

        const message_id = params.id;
        const id = addId(profile.id, message_id);

        try {
            const res = await pb.collection('reacts').getOne(id);

            if (res.react === react) return;
            await pb.collection('reacts').update(id, { react });

            const message = {};
            if (res.react > 0) message[res.react + '-'] = 1;
            if (react > 0) message[react + '+'] = 1;

            await pb.collection('messages').update(message_id, message);

        } catch (err) {
            console.log(err.message);

            const res = await pb.collection('messages').update(message_id, { [react + '+']: 1 });

            const { chat_id } = res;
            const talk_id = addId(chat_id, profile.id);

            await pb.collection('reacts').create({
                id,
                react,
                profile_id: profile.id,
                message_id,
                talk_id,
                chat_id
            });
        }
    }
}