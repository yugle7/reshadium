export const default_params = {
    sort: '-changed'
};

export const discussion_sort = {
    '-changed': 'Актуальные',
    '-like': 'Интересные'
};

export const discussion_topic = [
    'Правила сайта',
    'Ответы на частые вопросы',
    'Новости и важные объявления',
    'Новости разработки',
    'Встречи в Москве',
    'Свободное общение',
    'Пользователи о себе',
    'Ищу работу мечты',
    'Предлагаю работу',
    'Рассудите, кто прав',
    'Ваши вопросы',
    'Ошибки на сайте, что улучшить',
    'Другое'
];

export const getDiscussion = (discussion) => {
    const { title, topic, text } = discussion;
    return { title, topic, text };
}