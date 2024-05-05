import { writable } from "svelte/store";
import { subId } from "$lib";
import { getTime } from "$lib/time/data";

export const show = writable(null);
export const look = writable(null);
export const edit = writable(null);
export const text = writable(null);
export const down = writable(null);
export const find = writable(null);
export const menu = writable(null);

export const scroll = writable(null);
export const select = writable(null);

export const reply = writable(null);

export const message_react = [1, 2, 3, 4, 5, 6, 7];

export const chat_type = [
    'Личная переписка',
    'Совместное общение',
    'Уточняю условие',
    'Смотрю как решали',
    'Сочиняю условие',
    'Придумываю решение',
    'Решаю задачу',
    'Проверяю решение',
    'Смотрю правку'
];

export const getTitle = (chat, talk) => chat.type ? chat.title : talk.user.username;

export const getUrl = (chat) => {
    const { type, talk } = chat;
    const { profile_id, user } = talk;
    let url;

    if (type === 0) url = `/users/${user.username}`;
    else if (type === 1) url = `/discussions/${chat.id}`;
    else if (type === 7) url = `/solutions/${chat.id}`
    else if (type === 8) url = `/drafts/${chat.id}`
    else {
        const id = subId(chat.id, type === 6 ? profile_id : String(type).repeat(15));
        url = `/problems/${id}`;
    }
    return `${url}?type=${type}`
}

export const getReply = (message) => {
    const { id, author_id, author, text } = message;
    return { id, author_id, author, text };
}

export async function loadMessages(pb, chat_id) {
    const messages = await pb.collection('messages').getFullList({
        filter: `chat_id="${chat_id}"`,
        sort: 'created'
    });
    return messages;
}