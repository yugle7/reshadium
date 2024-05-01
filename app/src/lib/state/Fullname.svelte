<script>
	import { params, errors } from '$lib';
</script>

<div class="col">
	<input
		class="input"
		type="text"
		name="fullname"
		bind:value={$params.fullname}
		placeholder="Имя"
		on:input={() => ($errors.fullname = null)}
	/>
	{#if $errors.fullname}
		<span class="failed">{$errors.fullname}</span>
	{/if}
</div>
