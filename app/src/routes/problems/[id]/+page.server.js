import { addId } from "$lib";
import { solution_progress } from "$lib/solution/data";
import { getAuthor } from "$lib/user/data";
import { isProven } from "$lib/rule/data";

async function loadReacts(pb, talk_id) {
    const res = await pb.collection('reacts').getFullList({
        filter: `talk_id="${talk_id}"`
    });
    const reacts = {};

    res.forEach(({ message_id, react }) => (reacts[message_id] = react));
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

async function loadMessages(pb, chat_id) {
    return await pb.collection('messages').getFullList({
        filter: `chat_id="${chat_id}"`,
        sort: 'created'
    });
}

async function loadChat(pb, profile, problem, type) {
    let { id, title } = problem;

    id = addId(id, type === 6 ? profile.id : String(type).repeat(15));
    let chat;

    try {
        chat = await pb.collection('chats').getOne(id);
        chat.messages = await loadMessages(pb, id);
    } catch (err) {
        console.log(err.message);

        chat = await pb.collection('chats').create({
            id,
            title,
            type,
            changed: new Date()
        });
        chat.messages = [];
    }
    return chat;
}

const types = [2, 3, 4, 5, 6];

export async function load({ parent, url, locals }) {
    const pb = locals.pb;

    const type = +url.searchParams.get('type');
    if (!types.includes(type)) return {};

    const profile = pb.authStore.model;
    if (type === 6 && !profile) return {};

    const { problem } = await parent();
    if (!problem) return {};

    const chat = await loadChat(pb, profile, problem, type)
    if (!profile) return { chat };

    const talk = await loadTalk(pb, profile.id, chat.id);
    return { chat, talk }
}

const sendMessage = async (pb, solution, progress) => {
    if (!progress) await createTalk(pb, solution);
    updateTalk(pb, solution);
}

const createTalk = async (pb, solution) => {
    const { id, author_id, problem_id } = solution;

    try {
        const { title } = await pb.collection('problems').getOne(problem_id)
        await pb.collection('chats').create({
            id,
            type: 6,
            title
        });
    } catch (err) {
        console.log(err.message);
    }
    try {
        await pb.collection('talks').create({
            id: addId(author_id, id),
            chat_id: id,
            profile_id: author_id
        });
    } catch (err) {
        console.log(err.message);
    }
};


const updateTalk = async (pb, solution) => {
    const { author_id, author, progress } = solution;
    const text = solution_progress[progress];

    try {
        let res = await pb.collection('messages').create({
            text,
            author_id,
            author,
            chat_id: solution.id
        });

        res = await pb.collection('chats').update(solution.id, {
            'sent+': 1,
            sender_id: author_id,
            message: { text, author },
            message_id: res.id,
            changed: res.updated
        });

        const id = addId(author_id, solution.id);
        await pb.collection('talks').update(id, {
            read: res.sent,
            deleted: false
        });

    } catch (err) {
        console.log(err.message);
    }
};

export const actions = {
    progress: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;

        const id = addId(profile.id, params.id);
        const { author_id, progress, step, expand } = await pb.collection('solutions').getOne(id, { expand: 'problem_id' });
        const problem = expand.problem_id;
        const { weight, rule } = problem;

        const data = await request.formData();
        console.log(data);

        let solution = {
            progress: +data.get('progress'),
            'step+': (progress === 0 || progress === 3 || progress === 4) - (progress === 5),
            changed: new Date()
        };
        const answer = data.get('answer');
        const proof = data.get('proof');

        if (answer != null) solution.answer = answer;
        if (proof != null) solution.proof = proof;

        solution = await pb.collection('solutions').update(id, solution);
        const actions = [];

        if (solution.progress !== progress) {
            actions.push(sendMessage(pb, solution, progress));

            if (!progress) {
                actions.push(pb.collection('users').update(profile.id, { 'solutions+': 1 }));
                actions.push(pb.collection('problems').update(problem.id, { 'solutions+': 1 }));
            }
        }
        if (progress === 5 && solution.progress !== 5 && weight > 0) {
            const { rating } = await pb.collection('users').update(author_id, { 'rating-': weight });

            for (let i = 1; i <= weight; i++) {
                const id = String(rating + i).padStart(15, '0');
                actions.push(pb.collection('positions').update(id, { 'users-': 1 }));
            }
        }
        await Promise.all(actions);

        if (solution.progress == 2) {
            const proven = await isProven(pb, solution, rule);
            if (proven != null) {
                const progress = proven ? 5 : 4;
                solution = await pb.collection('solutions').update(id, {
                    'step+': 1,
                    progress
                });
                await updateTalk(pb, solution);
                return { progress };
            }
        }
        return {};
    },
    status: async ({ request, params, locals }) => {
        const pb = locals.pb;

        const data = await request.formData();
        const status = +data.get('status');
        console.log(data);

        await pb.collection('problems').update(params.id, { status });
    },
    react: async ({ request, params, locals }) => {
        const pb = locals.pb;
        const profile = pb.authStore.model;
        const problem_id = params.id;

        const data = await request.formData();
        const react = +data.get('react');

        const id = addId(profile.id, problem_id);

        try {
            const res = await pb.collection('solutions').getOne(id);

            if (res.react === react) return;
            await pb.collection('solutions').update(id, { react });

            const problem = {};
            if (res.react > 0) problem[res.react + '-'] = 1;
            if (react > 0) problem[react + '+'] = 1;

            await pb.collection('problems').update(problem_id, problem);

        } catch (err) {
            console.log(err.message);

            await pb.collection('solutions').create({
                id,
                react,
                author_id: profile.id,
                author: getAuthor(profile),
                problem_id
            });
            await pb.collection('problems').update(problem_id, { [react + '+']: 1 });
        }
    }
}