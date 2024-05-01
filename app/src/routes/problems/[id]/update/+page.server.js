import { redirect } from "@sveltejs/kit";
import { getAuthor } from "$lib/user/data";
import { getDraft } from "$lib/draft/data";

export const load = async ({ locals, params }) => {
    const pb = locals.pb;

    const profile = pb.authStore.model;
    if (!profile) throw redirect('/login');

    const problem = await pb.collection('problems').getOne(params.id);
    return { profile, problem };
}

export const actions = {
    default: async ({ request, locals, params }) => {
        const pb = locals.pb;
        const problem_id = params.id;

        const profile = pb.authStore.model;
        if (!profile) throw redirect('/login');

        const data = await request.formData();
        console.log(data);

        const title = data.get('title');
        const condition = data.get('condition');
        const categories = data.getAll('categories');

        if (title && condition && categories.length > 0) {
            const problem = await pb.collection('problems').update(problem_id, { 'drafts+': 1 });

            const { id } = await pb.collection('drafts').create({
                editor_id: profile.id,
                editor: getAuthor(profile),
                problem_id,
                problem: getDraft(problem),
                title,
                categories,
                condition,
                notes: data.get('notes') || null,
                answer: data.get('answer') || null,
                proof: data.get('proof') || null,
                changed: new Date()
            });

            await pb.collection('users').update(profile.id, { 'drafts+': 1 });

            redirect(303, `/drafts/${id}`);
        }
    }
}