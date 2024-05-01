<script>
	import { screen } from '$lib';

	import Top from '$lib/menu/Top.svelte';
	import Resize from '$lib/page/Resize.svelte';

	import Chat from '$lib/chat/Chat.svelte';
	import ToChat from '$lib/chat/ToChat.svelte';

	import Draft from '$lib/draft/Draft.svelte';
	import Scroll from '$lib/page/Scroll.svelte';

	export let data;
	const { draft, problem, profile } = data;

	$: chat = data.chat;
	$: talk = data.talk;
</script>

<svelte:head>
	<title>Правка – {draft.title}</title>
</svelte:head>

{#if $screen}
	{#if chat}
		<Chat {chat} {talk} {profile} />
	{:else if draft}
		<Top types={[8]}>Правка</Top>
		<Draft {draft} {problem} {profile} />
	{/if}
{:else if draft}
	<Scroll>
		<ToChat {chat} type="8" />
		<Draft {draft} {problem} {profile} />
	</Scroll>
	{#if chat}
		<Resize>
			<Chat {chat} {talk} {profile} />
		</Resize>
	{/if}
{/if}
