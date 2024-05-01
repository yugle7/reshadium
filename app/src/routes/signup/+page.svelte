<script>
	import { params, errors } from '$lib';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import Password from '$lib/state/Password.svelte';
	import Email from '$lib/state/Email.svelte';
	import Fullname from '$lib/state/Fullname.svelte';
	import Username from '$lib/state/Username.svelte';
	import Contacts from '$lib/state/Contacts.svelte';

	export let form;

	$: disabled =
		['username', 'fullname', 'email', 'password', 'contacts'].some((k) => $errors[k]) ||
		['username', 'email', 'password'].some((k) => !$params[k]);
</script>

<svelte:head>
	<title>Регистрация</title>
</svelte:head>

{#if form?.profile}
	<div class="auth">
		<p>
			Hа почту <code>{$params.email}</code> отправлено письмо с просьбой ее подтвердить.
		</p>
		<a class="link" href="/users/{form.profile.username}">Перейти в аккаунт?</a>
	</div>
{:else}
	<form
		class="auth"
		method="post"
		use:enhance={(cancel) => {
			if (disabled) cancel();
		}}
	>
		<Username />
		<Fullname />

		<Email />
		<Contacts />

		<Password />

		<div class="col">
			{#if form?.error}
				<span class="failed">{form.error}</span>
			{/if}
			<button class="button" {disabled} type="submit">Регистрация</button>
			<a class="link right font-14" href="/login">Вернуться в форму входа?</a>
		</div>
	</form>
{/if}
