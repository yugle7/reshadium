import { fail, redirect } from "@sveltejs/kit";
import { PASSWORD } from '$env/static/private';
import crypto from 'crypto';


export const load = (async ({ locals, url }) => {
    if (locals.pb.authStore.model) return redirect(303, '/users');

    const authMethods = await locals.pb.collection('users').listAuthMethods();
    return { providers: authMethods.authProviders };
})

const oauth = async (request, locals, url, cookies, name) => {
    const authMethods = await locals.pb.collection('users').listAuthMethods();
    const provider = authMethods.authProviders.find((p) => p.name === name);

    const options = { httpOnly: true, path: '/oauth' };
    cookies.set('provider', JSON.stringify(provider), options);

    throw redirect(302, provider.authUrl + url.origin + '/oauth');
}

export const actions = {
    login: async ({ request, url, locals }) => {
        const pb = locals.pb;

        const data = await request.formData();

        const hash = crypto.createHash('sha256');
        hash.update(data.get('password'));
        hash.update(PASSWORD);
        const password = hash.digest('hex');

        try {
            await pb.collection('users').authWithPassword(data.get('login'), password);
        } catch (err) {
            console.log(err.message);
            return fail(401, { errors: err.message });
        }
        const { username } = pb.authStore.model;
        throw redirect(303, data.get('back') || `/users/${username}`);
    },
    yandex: async ({ request, locals, url, cookies }) => await oauth(request, locals, url, cookies, 'yandex'),
    google: async ({ request, locals, url, cookies }) => await oauth(request, locals, url, cookies, 'google')
}
