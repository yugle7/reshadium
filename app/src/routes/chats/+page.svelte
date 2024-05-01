<script>
	import { screen, params } from '$lib';
	import { chat_type } from '$lib/chat/data';

	import Chats from '$lib/chat/Chats.svelte';
	import Params from '$lib/chat/Params.svelte';

	import Scroll from '$lib/page/Scroll.svelte';
	import Resize from '$lib/page/Resize.svelte';

	import Top from '$lib/menu/Top.svelte';

	import Side from '$lib/page/Side.svelte';
	import Over from '$lib/page/Over.svelte';

	export let data;
	$: profile = data.profile;

	$: title = $params.type == null ? 'Все' : chat_type[$params.type];
</script>

<svelte:head>
	<title>Чаты – {title}</title>
</svelte:head>

{#if $screen}
	<Top>Чаты</Top>
	<h1 class="info">{title}</h1>
	{#await data.chats}
		<h2 class="info">Получаем</h2>
	{:then chats}
		<Chats {chats} {profile} />
	{/await}
	<Over>
		<Params />
	</Over>
{:else}
	<Scroll>
		{#await data.chats}
			<h2 class="info">Получаем</h2>
		{:then chats}
			<Chats {chats} {profile} />
		{/await}
	</Scroll>
	<Resize>
		<Side>
			<Params />
		</Side>
	</Resize>
{/if}
