<script>
	import { screen } from '$lib';

	import Top from '$lib/menu/Top.svelte';

	import Chat from '$lib/chat/Chat.svelte';
	import ToChat from '$lib/chat/ToChat.svelte';

	import Problem from './Problem.svelte';

	import Resize from '$lib/page/Resize.svelte';
	import Side from '$lib/problem/Side.svelte';
	import Over from '$lib/problem/Over.svelte';

	export let data;
	export let form;

	const { problem, solution, profile } = data;
	const { title, author, chat_types } = problem;

	const side = profile && (profile.is_manager || chat_types.length > 1);

	$: chat = data.chat;
	$: talk = data.talk;
</script>

<svelte:head>
	<title>Задача – {title}</title>
	<meta name="description" content="Задача: {title}, Автор: {author.username}" />
</svelte:head>

{#if $screen}
	{#if chat}
		<Chat {chat} {talk} {profile} />
	{:else if $screen === 3}
		<Over {problem} {profile} />
	{:else if problem}
		<Top types={chat_types}>Задача</Top>
		<Problem {problem} {solution} {profile} {form} />
	{/if}
{:else if problem}
	<div class="scroll">
		{#if !side}
			<ToChat {chat} type="2" />
		{/if}
		<Problem {problem} {solution} {profile} {form} />
	</div>
	{#if side}
		<Resize>
			{#if chat}
				<Chat {chat} {talk} {profile} />
			{:else}
				<Side {problem} {profile} />
			{/if}
		</Resize>
	{:else if chat}
		<Resize>
			<Chat {chat} {talk} {profile} />
		</Resize>
	{/if}
{/if}
