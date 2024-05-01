<script>
	import { screen } from '$lib';
	
	import Discussion from '$lib/discussion/Discussion.svelte';
	import Chat from '$lib/chat/Chat.svelte';
	import ToChat from '$lib/chat/ToChat.svelte';
	
	import Top from '$lib/menu/Top.svelte';
	import Resize from '$lib/page/Resize.svelte';
	import Scroll from '$lib/page/Scroll.svelte';

	export let data;
	const { profile, discussion } = data;

	$: chat = data.chat;
	$: talk = data.talk;
</script>

<svelte:head>
	<title>Общение – {discussion.title}</title>
</svelte:head>

{#if $screen}
	{#if chat}
		<Chat {chat} {talk} {profile} />
	{:else if discussion}
		<Top types={[1]}>Общение</Top>
		<Discussion {discussion} {profile} />
	{/if}
{:else if discussion}
	<Scroll>
		<ToChat {chat} type="1" />
		<Discussion {discussion} {profile} />
	</Scroll>
	{#if chat}
		<Resize>
			<Chat {chat} {talk} {profile} />
		</Resize>
	{/if}
{/if}
