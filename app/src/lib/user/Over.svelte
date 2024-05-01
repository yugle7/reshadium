<script>
	import { screen, loaded } from '$lib';
	import { enhance } from '$app/forms';

	import Friend from './Friend.svelte';
	import Close from '$lib/page/Close.svelte';

	export let user;
	export let profile;
</script>

<Close on:click={() => ($screen = 2)} />

<div class="col gap-20 padding-20 center">
	<span />

	{#if !profile}
		<a class="link" href="/login">Войти</a>
	{:else if user}
		{#if profile.role}
			<a class="link" href="?type=0">Написать лично</a>
		{/if}
		<Friend {user} />
	{:else}
		<a class="link" href="/users/{profile.username}/update">Обновить данные</a>

		<form method="post" action="?/email_visibility" use:enhance>
			<input
				type="hidden"
				bind:value={profile.emailVisibility}
				name="email_visibility"
				id="email_visibility"
			/>
			<button class="link" type="submit">
				{#if profile.emailVisibility}
					Скрыть почту от всех
				{:else}
					Сделать почту видимой всем
				{/if}
			</button>
		</form>

		<span />

		<a class="link" href="/discussions/create">Создать совместное общение</a>
		<a class="link" href="/problems/create">Предложить новую задачу</a>

		<span />

		<form method="post" action="?/logout" use:enhance>
			<button class="link" type="submit">Выйти</button>
		</form>
	{/if}
</div>
