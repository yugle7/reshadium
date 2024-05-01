<script>
	import { params, errors } from '$lib';
	import { checkPassword } from './data';
</script>

<div class="col">
	<input
		class="input"
		class:failed={$errors.password}
		placeholder="Пароль"
		bind:value={$params.password}
		on:input={() => $errors.password}
		on:blur={() => ($errors.password = checkPassword($params.password))}
		type="password"
		name="password"
	/>
	{#if $errors.password}
		<span class="failed">{$errors.password}</span>
	{/if}
</div>
