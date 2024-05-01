import { redirect } from '@sveltejs/kit';

const getUsername = async (id) => {
    for (let i = 0; i < 10; i++) {
        try {
            const res = await pb.collection('username').getOne('000000000000000');
            username = res.which + res.who;

            await pb.collection('users').update(id, { username });
            return username;

        } catch (err) {
            console.log(err.message);
        }
    }
}
export const GET = async ({ locals, url, cookies }) => {
    const provider = JSON.parse(cookies.get('provider'));

    const state = await url.searchParams.get('state');
    const code = await url.searchParams.get('code');

    if (provider.state !== state) throw redirect(303, '/login?oauth=error');

    let username;

    try {
        const pb = locals.pb;

        const { meta, record } = await pb.collection('users').authWithOAuth2Code(
            provider.name,
            code,
            provider.codeVerifier,
            url.origin + '/oauth'
        )

        if (meta.isNew && record.username.startsWith('users')) {
            username = await getUsername(record.id);
        }
        username = username || record.username;

    } catch (err) {
        console.error(err);
    }

    throw redirect(303, username ? `/users/${username}` : '/login?oauth=error');
};