<script>
	import { screen, params } from '$lib';
	import { user_role, user_sort, default_params } from '$lib/user/data';

	import Top from '$lib/menu/Top.svelte';

	import Scroll from '$lib/page/Scroll.svelte';
	import Resize from '$lib/page/Resize.svelte';

	import Params from '$lib/user/Params.svelte';
	import Users from '$lib/user/Users.svelte';

	import Over from '$lib/page/Over.svelte';
	import Side from '$lib/page/Side.svelte';

	export let data;
	$: profile = data.profile;

	let title;
	$: if ($params) {
		const { sort, friend, wanted, role } = $params;
		const names = [user_sort[sort]];
		if (friend) names.push('Друзья');
		if (wanted) names.push('Запрошена роль');
		if (role != null) names.push(user_role[role]);
		title = names.join(' – ');
	}
</script>

<svelte:head>
	<title>Люди – {title}</title>
</svelte:head>

{#if $screen}
	{#if $screen === 3}
		<Over {default_params}>
			<Params {profile} />
		</Over>
	{:else}
		<Top>Люди</Top>
		<h1 class="info">{title}</h1>
		{#await data.users}
			<h2 class="info">Получаем</h2>
		{:then users}
			<Users {users} {profile} />
		{/await}
	{/if}
{:else}
	<Scroll>
		{#await data.users}
			<h2 class="info">Получаем</h2>
		{:then users}
			<Users {users} {profile} />
		{/await}
	</Scroll>
	<Resize>
		<Side {default_params}>
			<Params {profile} />
		</Side>
	</Resize>
{/if}
