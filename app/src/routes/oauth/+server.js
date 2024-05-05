import { redirect } from '@sveltejs/kit';

const getUsername = async (record) => {
    const { id, username } = record;

    if (username.startsWith('users')) {
        for (let i = 0; i < 10; i++) {
            try {
                const { which, who } = await pb.collection('username').getOne('000000000000000');
                username = which + who;

                const res = await pb.collection('users').update(id, { username: which + who });
                if (res) return res.username;

            } catch (err) {
                console.log(err.message);
            }
        }
    }
    return username;
}
export const GET = async ({ locals, url, cookies }) => {
    const provider = JSON.parse(cookies.get('provider'));

    const state = await url.searchParams.get('state');
    const code = await url.searchParams.get('code');

    if (provider.state !== state) throw redirect(303, '/login?oauth=error');

    let username;

    try {
        const pb = locals.pb;

        const { record } = await pb.collection('users').authWithOAuth2Code(
            provider.name,
            code,
            provider.codeVerifier,
            url.origin + '/oauth'
        )
        username = await getUsername(record);
        console.log(username);

    } catch (err) {
        console.error(err);
    }

    throw redirect(303, username ? `/users/${username}` : '/login?oauth=error');
};