import { addId } from "$lib";
import { solution_progress, getSolution } from "$lib/solution/data";
import { getAuthor } from "$lib/user/data";
import { loadMessages } from "$lib/chat/data";

async function loadReacts(pb, talk_id) {
    const res = await pb.collection('reacts').getFullList({
        filter: `talk_id="${talk_id}"`
    });
    const reacts = {};
    res.forEach((r) => (reacts[r.message_id] = r.react));
    return reacts;
}

async function loadTalk(pb, profile_id, chat_id) {
    const id = addId(profile_id, chat_id);
    let talk;

    try {
        talk = await pb.collection('talks').getOne(id);
        if (talk.message_id) await pb.collection('talks').update(id, { message_id: null });

        talk.reacts = await loadReacts(pb, id);
    } catch (err) {
        console.log(err.message);

        talk = await pb.collection('talks').create({
            id,
            profile_id,
            chat_id,
            deleted: true
        });
        talk.reacts = {};
    }
    return talk;
}

async function loadChat(pb, solution, problem) {
    const { id } = solution;
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, id);
    } catch (err) {
        console.log(err.message);

        chat = await pb.collection('chats').create({
            id,
            title: problem.title,
            type: 7,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

export async function load({ parent, url, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    if (!profile) throw redirect('/login');
    if (url.searchParams.get('type') !== '7') return {};

    const { solution, problem } = await parent();
    if (!solution || !problem) return {};

    const chat = await loadChat(pb, solution, problem)
    const talk = await loadTalk(pb, profile.id, chat.id);

    return { chat, talk }
}

async function sendMessage(pb, profile, solution, progress) {
    const author = getAuthor(profile);
    const text = solution_progress[progress];

    try {
        const { id, updated } = await pb.collection('messages').create({
            text,
            author_id: profile.id,
            author,
            chat_id: solution.id
        });
        const { sent } = await pb.collection('chats').update(solution.id, {
            sender_id: profile.id,
            message: { text, author, message_id: id },
            'sent+': 1,
            changed: updated
        });
        {
            const id = addId(solution.id, profile.id);
            try {
                await pb.collection('talks').update(id, { deleted: false, read: sent });
            } catch (err) {
                console.log(err.message);
                await pb.collection('talks').create({ id, read: sent })
            }
        }
    } catch (err) {
        console.log(err.message);
    }
}

export const actions = {
    progress: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        if (!profile) throw redirect('/login');
        const data = await request.formData();
        console.log(data);

        const progress = +data.get('progress');
        const weight = +data.get('weight');

        const solution = await pb.collection('solutions').getOne(params.id);
        const { author_id } = solution;

        const actions = [
            pb.collection('reviews').create({
                solution_id: solution.id,
                reviewer_id: profile.id,
                progress,
                solution: getSolution(solution)
            }),
            sendMessage(pb, profile, solution, progress),
            pb.collection('solutions').update(params.id, {
                'step+': +(solution.progress >= 3 && solution.step % 2),
                solution: getSolution(solution),
                progress
            })
        ];

        const user = {};
        if (weight) {
            if (progress === 5 && solution.progress !== 5) {
                const { role, rating } = await pb.collection('users').update(author_id, { 'rating+': weight });
                if (!role && rating > 5) user.role = 1;
                user.rating = rating;

                for (let i = 0; i < weight; i++) {
                    const id = String(rating - i).padStart(15, '0');
                    actions.push(pb.collection('positions').update(id, { 'users+': 1 }));
                }
            } else if (progress !== 5 && solution.progress === 5) {
                const { rating } = await pb.collection('users').update(author_id, { 'rating-': weight });
                user.rating = rating;

                for (let i = 1; i <= weight; i++) {
                    const id = String(rating + i).padStart(15, '0');
                    actions.push(pb.collection('positions').update(id, { 'users-': 1 }));
                }
            }
        }
        await Promise.all(actions);

        if (user.rating != null) {
            const id = String(user.rating).padStart(15, '0');
            delete user.rating;

            console.log(id);
            const { users } = await pb.collection('positions').getOne(id);
            user.position = users;

            await pb.collection('users').update(author_id, user);
        }
    },
    review: async ({ params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        if (!profile) throw redirect('/login');

        const solution = await pb.collection('solutions').getOne(params.id);
        const { reviewer_id } = solution;

        let actions;
        if (reviewer_id !== profile.id) {
            const progress = 3;

            actions = [
                sendMessage(pb, profile, solution, progress),
                pb.collection('reviews').create({
                    solution_id: solution.id,
                    reviewer_id: profile.id,
                    progress,
                    solution: getSolution(solution)
                }),
                pb.collection('solutions').update(solution.id, {
                    reviewer: getAuthor(profile),
                    reviewer_id: profile.id,
                    progress
                })
            ];
            actions.push(pb.collection('users').update(profile.id, { 'reviews+': 1 }));
        } else {
            const progress = Math.min(2, solution.progress);

            actions = [
                pb.collection('reviews').create({
                    solution_id: solution.id,
                    reviewer_id,
                    progress,
                    solution: getSolution(solution)
                }),
                pb.collection('solutions').update(solution.id, {
                    reviewer: null,
                    reviewer_id: null,
                    progress
                })
            ];
        }
        if (reviewer_id) {
            actions.push(pb.collection('users').update(reviewer_id, { 'reviews-': 1 }));
        }
        await Promise.all(actions);
    }
}