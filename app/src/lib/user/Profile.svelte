<script>
	import { user_role } from './data';
	import { getPlural } from '$lib/text/data';

	import Author from './Author.svelte';
	import Contact from './Contact.svelte';

	export let user;
	export let profile;

	const author = user || profile;

	const { position, rating, fullname, role, email, contacts } = author;
	const { id, friends, problems, solutions, drafts, discussions, reviews } = author;

	const names = [user_role[role]];
	if (email) names.push(email);
	const subtitle = names.join(' – ');
</script>

<div class="col">
	<h1 class="title">
		<Author {author} />
		<span class="subtitle left-5">{fullname}</span>
	</h1>
	<span class="subtitle">
		{subtitle}
		{#if contacts?.length}
			–
			{#each contacts as contact}
				<Contact {contact} />
			{/each}
		{/if}
	</span>
</div>

{#if rating > 0}
	<div class="col gap-5">
		<span class="title"><span class="monospace">{position}</span> место</span>
		<span class="subtitle">Рейтинг {rating}</span>
	</div>
{/if}

{#if friends || problems || discussions || drafts || solutions}
	<div>
		{#if problems}
			<a class="link right-5 comma nowrap" href="/problems?author_id={id}">
				<span class="monospace">{problems}</span>
				{getPlural(problems, ['задача', 'задачи', 'задач'])}
			</a>
		{/if}
		{#if drafts}
			<a class="link right-5 comma nowrap" href="/drafts?author_id={id}">
				<span class="monospace">{drafts}</span>
				{getPlural(drafts, ['правка', 'правки', 'правок'])}
			</a>
		{/if}
		{#if solutions}
			{#if user}
				<a class="link right-5 comma nowrap" href="/solutions?author_id={id}">
					<span class="monospace">{solutions}</span>
					{getPlural(solutions, ['решение', 'решения', 'решений'])}
				</a>
			{:else}
				<a class="link right-5 comma nowrap" href="/chats?type=6">
					<span class="monospace">{solutions}</span>
					{getPlural(solutions, ['решение', 'решения', 'решений'])}
				</a>
			{/if}
		{/if}
		{#if friends}
			<a class="link right-5 comma nowrap" href="/users?friend=true">
				<span class="monospace">{friends}</span>
				{getPlural(friends, ['друг', 'друга', 'друзей'])}
			</a>
		{/if}
		{#if discussions}
			<a class="link right-5 comma nowrap" href="/discussions?author_id={id}">
				<span class="monospace">{discussions}</span>
				{getPlural(discussions, ['обсуждение', 'обсуждения', 'обсуждений'])}
			</a>
		{/if}
		{#if reviews}
			<a class="link right-5 comma nowrap" href="/solutions?reviewer_id={id}">
				<span class="monospace">{reviews}</span>
				{getPlural(reviews, ['проверка', 'проверки', 'проверок'])}
			</a>
		{/if}
	</div>
{/if}
