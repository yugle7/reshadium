import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, params, locals }) => {
        const pb = locals.pb;

        const profile = pb.authStore.model;
        if (!profile) throw redirect('/login');

        const data = await request.formData();
        console.log(data);

        const title = data.get('title');
        const condition = data.get('condition');
        const categories = data.getAll('categories');

        if (title && condition && categories.length > 0) {
            await pb.collection('drafts').update(params.id, {
                title,
                categories,
                condition,
                notes: data.get('notes') || null,
                answer: data.get('answer') || null,
                proof: data.get('proof') || null,
                changed: new Date()
            });

            redirect(303, `/drafts/${params.id}`);
        }
    }
}