import { fail, redirect } from "@sveltejs/kit";

import { PASSWORD } from '$env/static/private';
import crypto from 'crypto';

export const actions = {
    default: async ({ request, locals }) => {
        const pb = locals.pb;

        const data = await request.formData();
        console.log(data);

        const email = data.get('email');
        const contacts = data.get('contacts') ? data.get('contacts').split() : [];

        const hash = crypto.createHash('sha256')
        hash.update(data.get('password'))
        hash.update(PASSWORD)
        const password = hash.digest('hex')

        const username = data.get('username');
        const fullname = data.get('fullname');

        try {
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                username,
                fullname,
                contacts
            });
        } catch (err) {
            console.log(err.message);
            return fail(401, { errors: err.message });
        }
        try {
            const { record } = await pb.collection('users').authWithPassword(email, password);
            console.log(record);

            // const res = await pb.collection('users').requestVerification(email);
            // if (!res) {
            //     return fail(401, { errors: 'не получилось отправить письмо' });
            // }
            return { profile: pb.authStore.model }

        } catch (err) {
            return fail(401, { errors: err.message });
        }
    }
}
