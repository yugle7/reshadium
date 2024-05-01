<script>
	import { screen, params, errors } from '$lib';
	import { enhance } from '$app/forms';

	import Username from '$lib/state/Username.svelte';
	import Fullname from '$lib/state/Fullname.svelte';
	import Contacts from '$lib/state/Contacts.svelte';

	export let data;
	export let form;

	const { username, fullname, contacts } = data.profile;
	$params = { username, fullname, contacts: contacts?.join('\n') || '' };
	$errors = {};

	if ($screen) $screen = 2;
	
	$: disabled = Object.values($errors).some((e) => !!e) || !$params.username;
	$: if (form) Object.items(form.errors).forEach((k, e) => ($errors[k] = e));
</script>

<svelte:head>
	<title>Редактирование моего профиля</title>
</svelte:head>

{#if $screen}
	<a class="top-right" href="/users/{username}">
		<img src="/icons/close.svg" alt="close" />
	</a>
{/if}

<form class="auth" method="post" use:enhance>
	<Username />
	<Fullname />
	<Contacts />
	<div class="col">
		<button {disabled} class="button" type="submit">Обновить</button>
		<a class="link right font-16" href="/users/{username}">Вернуться?</a>
	</div>
</form>
