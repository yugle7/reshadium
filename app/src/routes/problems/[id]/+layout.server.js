import { addId } from "$lib";
import { getAuthor } from "$lib/user/data";
import { error } from "@sveltejs/kit";

const getChatTypes = (solution, profile) => {
    if (!solution) return [2];

    const { progress, step } = solution;
    const { role } = profile;

    const types = [2];
    if (progress === 5) types.push(3);
    if (role >= 2) types.push(4);
    if (progress === 5 && role >= 2) types.push(5);
    if (step > 0) types.push(6);
    return types;
}

async function loadSolution(pb, profile, problem) {
    const id = addId(problem.id, profile.id);
    try {
        return await pb.collection('solutions').getOne(id);
    } catch (err) {
        console.log(err.message);

        return await pb.collection('solutions').create({
            id,
            author_id: profile.id,
            author: getAuthor(profile),
            problem_id: problem.id,
            answer: '',
            proof: ''
        });
    }
}
async function loadProblem(pb, id) {
    try {
        return await pb.collection('problems').getOne(id);
    } catch (err) {
        console.log(err.message);
        error(404, 'нет такой задачи')
    }
}

export async function load({ params, locals }) {
    const pb = locals.pb;
    const profile = pb.authStore.model;

    const problem = await loadProblem(pb, params.id);
    let solution;

    if (profile) {
        solution = await loadSolution(pb, profile, problem);
        problem.react = solution.react;
        profile.is_manager = profile.role >= 3 || problem.author_id === profile.id;
    }
    problem.chat_types = getChatTypes(solution, profile);
    if (!profile?.is_manager) {
        delete problem.drafts;
        delete problem.solutions;
    }
    return { problem, solution, profile };
}

