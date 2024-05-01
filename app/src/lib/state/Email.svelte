<script>
	import { params, errors } from '$lib';
	import { checkEmail } from './data';
</script>

<div class="col">
	<input
		class="input"
		class:failed={$errors.email}
		placeholder="Email"
		bind:value={$params.email}
		on:input={() => ($errors.email = null)}
		on:blur={() => ($errors.email = checkEmail($params.email))}
		type="email"
		name="email"
	/>
	{#if $errors.email}
		<span class="failed">{$errors.email}</span>
	{/if}
</div>
