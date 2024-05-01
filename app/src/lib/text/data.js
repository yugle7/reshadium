export const parse = (text) => {
    let result = [];

    let code = false;
    text.split('```').forEach((t) => {
        t.split('\n').forEach(r => {
            if (r) result.push(code ? r : getSecretCodeLinkUserText(r));
        });
        code = !code;
    });
    return result;
}

const secret = /\[([^\]]+)\]\(([^\)]+)\)/g;

const getSecretCodeLinkUserText = (text) => {
    const result = [];

    let i = 0;
    for (const res of text.matchAll(secret)) {
        if (i < res.index) {
            addCodeLinkUserText(text.slice(i, res.index), result);
        }
        result.push([getCodeLinkUserText(res[1]), res[2]]);
        i = res.index + res[0].length;
    }
    if (i === 0) {
        addCodeLinkUserText(text, result);
    } else if (i < text.length) {
        addCodeLinkUserText(text.slice(i), result);
    }
    return result;
}
const getCodeLinkUserText = (text) => {
    const result = [];
    addCodeLinkUserText(text, result);
    return result;
}
const addCodeLinkUserText = (text, result) => {
    let code = false;
    text.split('`').forEach((t) => {
        if (code) {
            result.push([t]);
        } else {
            addLinkUserText(t, result);
        }
        code = !code;
    });
}

const url = /(https?:\/\/[a-z0-9.-_]+\.[a-z]{2,}(\/\S*)?)\(([^\)]+)\)/g;

const addLinkUserText = (text, result) => {
    let i = 0;
    for (const res of text.matchAll(url)) {
        if (i < res.index) {
            addUserText(text.slice(i, res.index), result);
        }
        result.push([res[1], res[3]]);
        i = res.index + res[0].length;
    }
    if (i === 0) {
        addUserText(text, result);
    } else if (i < text.length) {
        addUserText(text.slice(i), result);
    }
}

function addUserText(text, result) {
    if (!text) return;

    let i = 0;
    for (const res of text.matchAll(/@([a-z0-9_]+)/g)) {
        if (i < res.index) {
            result.push(text.slice(i, res.index));
        }
        result.push(['@', res[1]]);
        i = res.index + res[0].length;
    }
    if (i === 0) {
        result.push(text);
    } else if (i < text.length) {
        result.push(text.slice(i));
    }
}

export function parseUsernames(text) {
    return text.match(/(^|\s)@[a-z]{3,}\b/g)?.map((u) => u.substr(u[0] === '@' ? 1 : 2)) || [];
}

export function getPlural(k, names) {
    const d = Math.floor(k / 10);
    const m = k % 10;
    let i = 2;
    if (m === 1) {
        if (k != 11) i = 0;
    } else if (d != 1 && 1 < m && m < 5) {
        i = 1;
    }
    return names[i];
}

export const plural = (k, names) => `${k} ${getPlural(k, names)}`;

export const getWidth = (value, default_value, default_width) => default_width + String(value ?? default_value).length * (9 + default_width);

export const getMask = (values) => {
    let mask = 0;
    for (const value of values) mask |= 1 << value;
    return mask;
};

export const normText = (text) =>
    text
        .toLowerCase()
        .replace(/[^a-zа-яё0-9]/g, ' ')
        .split(' ')
        .filter((t) => t)
        .join(' ');


export function copyPaste(e) {
    let text = (e.clipboardData || window.DataTransfer).getData('text/plain');
    document.execCommand('insertText', false, text);
}

export function pasteToEnd(text) {
    document.execCommand('insertText', false, text);
}

export function isClick(window) {
    let selection = window.getSelection();
    if (!selection) return true;
    try {
        let range = selection.getRangeAt(0);
        return range.startOffset == range.endOffset;
    } catch (err) {
        console.log(err.message);
        return true;
    }
}