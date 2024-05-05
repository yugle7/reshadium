import { addId } from "$lib";
import { solution_progress } from "$lib/solution/data";
import { getAuthor, robot } from "$lib/user/data";
import { isProven } from "$lib/rule/data";
import { loadMessages } from "$lib/chat/data";

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

const getStep = (solution, progress) => {
    if (!solution.progress) return 1;
    if ((progress <= 2) === (solution.progress <= 2)) return 0;
    return progress === 5 ? -1 : 1;
}

const updateSolution = async (pb, solution, problem, reviewer, answer, proof, progress) => {
    const { weight } = problem;
    const { author_id } = solution;

    const dst = { progress, 'step+': getStep(solution, progress) };
    if (answer != solution.answer) dst.answer = answer;
    if (proof != solution.proof) dst.proof = proof;
    if (dst.answer || dst.proof) dst.changed = new Date();

    const actions = [pb.collection('solutions').update(id, dst)];

    if (!solution.progress) {
        await createTalk(pb, solution);
    }
    if (solution.progress !== progress) {
        actions.push(
            sendMessage(
                pb,
                solution.id,
                reviewer.id,
                getAuthor(reviewer),
                solution_progress[progress]
            )
        );
        if (!solution.progress) {
            actions.push(pb.collection('users').update(author_id, { 'solutions+': 1 }));
            actions.push(pb.collection('problems').update(problem.id, { 'solutions+': 1 }));
        }
    }
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
        const { users } = await pb.collection('positions').getOne(id);
        user.position = users;
        await pb.collection('users').update(author_id, user);
    }
}

const sendMessage = async (pb, chat_id, author_id, author, text) => {
    try {
        const { id, updated } = await pb.collection('messages').create({
            text,
            author_id,
            author,
            chat_id
        });
        const { sent } = await pb.collection('chats').update(chat_id, {
            'sent+': 1,
            sender_id: author_id,
            message: { text, author },
            message_id: id,
            changed: updated
        });
        await pb.collection('talks').update(
            addId(author_id, chat_id), {
            read: sent,
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
        const solution = await pb.collection('solutions').getOne(id, { expand: 'problem_id' });
        const problem = solution.expand.problem_id;

        const data = await request.formData();
        console.log(data);

        const answer = data.get('answer') || solution.answer;
        const proof = data.get('proof') || solution.proof;
        let progress = +data.get('progress')

        let reviewer = profile;
        if (progress == 2 && problem.rule) {
            const proven = await isProven(pb, problem, answer, proof);
            if (proven != null) {
                progress = proven ? 5 : 4;
                reviewer = robot;
            }
        }
        await updateSolution(pb, solution, reviewer, progress, answer, proof);
        return { progress };
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
                problem_id,
                changed: new Date()
            });
            await pb.collection('problems').update(problem_id, { [react + '+']: 1 });
        }
    }
}