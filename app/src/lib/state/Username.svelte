<script>
	import { params, errors } from '$lib';
	import { checkUsername } from './data';
</script>

<div class="col">
	<input
		class="input"
		class:failed={$errors.username}
		placeholder="Логин"
		bind:value={$params.username}
		on:input={() => ($errors.username = null)}
		on:blur={() => ($errors.username = checkUsername($params.username))}
		id="username"
		type="text"
		name="username"
		required
	/>
	{#if $errors.username}
		<span class="failed">{$errors.username}</span>
	{/if}
</div>
