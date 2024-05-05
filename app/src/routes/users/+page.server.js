import { default_params } from '$lib/user/data';

async function getFriends(pb, profile) {
    if (!profile) return [];

    const res = await pb.collection('friends').getFullList({
        filter: `profile_id="${profile.id}"`
    });
    const friends = res.map((f) => f.user_id);
    return friends;
}

const getPositions = async (pb) => {
    const res = await pb.collection('positions').getFullList();
    const positions = new Array(res.length).fill(0);
    res.forEach(({ id, users }) => positions[+id] = users);
    return positions;
}

function getUser(user, friends, positions) {
    const { id, username, rating, role } = user;
    const position = rating ? positions[rating] : (role >= 2 ? null : 0);
    return { id, username, position, rating, role, friend: friends.has(id) }
}

async function loadUsers(pb, profile, params) {
    const { role, wanted, friend } = params;
    if (wanted && role >= profile.role) return [];

    let { sort } = params;

    const filters = [];
    const friends = new Set(await getFriends(pb, profile));

    if (friend) {
        filters.push('(' + [...friends, profile.id].map(f => `id="${f}"`).join('||') + ')');
    } else {
        filters.push('(rating>0||role>0)');
    }
    if (wanted) {
        filters.push('wanted!=null');
        sort = sort.replace('created', 'wanted');
    }
    if (role != null) {
        filters.push(`role=${role}`);
    } else if (wanted) {
        filters.push('role<' + profile.role);
    }

    const res = await pb.collection('users').getList(1, 1000, {
        filter: filters.join('&&'),
        sort
    });
    const positions = await getPositions(pb);
    return res.items.map(u => getUser(u, friends, positions));
}

export async function load({ url, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const params = { ...default_params };
    for (const key of ['sort', 'role']) {
        params[key] = url.searchParams.get(key) || params[key];
    }
    if (profile) {
        for (const key of ['friend', 'wanted']) {
            if (url.searchParams.get(key)) params[key] = url.searchParams.get(key) === 'true';
        }
        params.wanted = profile.role >= 2 && params.wanted;
    }
    const users = loadUsers(pb, profile, params);
    return { users, profile };
}
