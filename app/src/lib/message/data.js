import { addId } from "$lib";

const getUsers = async (pb, text) => {
    const usernames = text.match(/(^|\s)@[a-z]{3,}\b/g)?.map((u) => u.substr(u[0] === '@' ? 1 : 2));
    if (!usernames || !usernames.length) return [];

    const filter = usernames.map((u) => `username="${u}"`).join('||');
    return await pb.collection('users').getFullList({ filter });
}

export async function updateTalks(pb, profile, message) {
    const { text, reply, chat_id } = message;

    const users = await getUsers(pb, text);
    console.log(users);

    if (reply) {
        const { author_id } = reply;
        if (author_id !== profile.id) users.push({ id: author_id });
    }
    Promise.all(
        users.map(({ id }) => {
            id = addId(id, chat_id);
            try {
                return pb.collection('talks').update(id, { message_id: message.id });
            } catch (err) {
                console.log(err.message);
            }
        })
    );
}