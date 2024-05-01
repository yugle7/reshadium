import { subId } from "$lib";
import { error } from "@sveltejs/kit";

async function isFriend(pb, profile, user) {
    const id = subId(profile.id, user.id);
    try {
        await pb.collection('friends').getOne(id);
        user.friend = true;
    } catch (err) {
        console.log(err.message);
    }
}

async function setPosition(pb, user) {
    const { rating, role } = user;
    if (!rating) {
        if (role >= 2) user.position = null;
        return;
    }
    const id = String(user.rating).padStart(15, '0');
    try {
        const { users } = await pb.collection('positions').getOne(id);
        user.position = users;
    } catch (err) {
        console.log(err.message);
    }
}

async function loadUser(pb, profile, username) {
    try {
        const user = await pb.collection('users').getFirstListItem(`username="${username}"`);
        delete user.friends;
        await setPosition(pb, user);
        if (profile) {
            await isFriend(pb, profile, user);
            profile.is_manager = profile.role >= 2;
        }
        if (!profile?.is_manager) {
            delete user.solutions;
            delete user.drafts;
            delete user.reviews;
        }
        return user;
    } catch (err) {
        console.log(err.message);
        error(404, `пользователь ${username} не найден`)
    }
}

export async function load({ params, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const { username } = params;
    if (profile?.username === username) {
        await setPosition(pb, profile);
        return { profile };
    }
    const user = await loadUser(pb, profile, username);

    return { user, profile };
}
