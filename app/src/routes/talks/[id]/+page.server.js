export const actions = {
    delete: async ({ request, params, locals }) => {
        const pb = locals.pb;

        const data = await request.formData();
        const deleted = data.get('deleted') === 'true';

        try {
            await pb.collection('talks').update(params.id, { deleted });
        } catch (err) {
            console.log(err.message);
        }
    }
}