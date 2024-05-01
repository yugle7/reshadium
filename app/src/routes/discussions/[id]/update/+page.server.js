import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;
        const { id } = params;

        if (!profile) throw redirect(303, '/login');

        const data = await request.formData();

        const title = data.get('title');
        const topic = +data.get('topic') || 0;
        const text = data.get('text');
        console.log(data, topic);

        if (title && text) {
            await pb.collection('discussions').update(id, {
                title,
                topic,
                text,
                changed: new Date()
            });
            redirect(303, `/discussions/${id}`);
        }
    }
}