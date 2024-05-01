<script>
	import { screen } from '$lib';
	import { user_role } from '$lib/user/data';

	import Menu from '$lib/user/Menu.svelte';
	import User from '$lib/user/User.svelte';

	import Chat from '$lib/chat/Chat.svelte';

	import Resize from '$lib/page/Resize.svelte';

	import Over from '$lib/user/Over.svelte';
	import Side from '$lib/user/Side.svelte';

	export let data;

	$: profile = data.profile;
	$: user = data.user;

	$: chat = data.chat;
	$: talk = data.talk;

	$: person = user || profile;
</script>

<svelte:head>
	<title>{user_role[person.role]} – {person.username}</title>
</svelte:head>

{#if $screen}
	{#if chat}
		<Chat {chat} {talk} {profile} />
	{:else if $screen === 3}
		<Over {user} {profile} />
	{:else}
		<Menu {user} {profile} />
		<User {user} {profile} />
	{/if}
{:else}
	<User {user} {profile} />
	{#if profile}
		<Resize>
			{#if chat}
				<Chat {chat} {talk} {profile} />
			{:else}
				<Side {user} {profile} />
			{/if}
		</Resize>
	{/if}
{/if}
