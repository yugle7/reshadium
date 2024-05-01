<script>
	import { user_role } from './data';
	import { enhance, applyAction } from '$app/forms';

	export let profile;
	let { to, role, wanted } = profile;
	let up = false;
</script>

<form
	method="post"
	action="?/want"
	class="row center gap-10"
	use:enhance={() => {
		wanted = up && to == role;
		if (!wanted) up ? role++ : role--;
		return applyAction;
	}}
>
	<input type="hidden" bind:value={up} name="up" id="up" />

	{#if wanted}
		<button class="link" on:click={() => (up = false)}>
			{user_role[role]}
		</button>
		&larr;
		<div class="col center">
			<span>{user_role[role + 1]}</span>
			<span class="link font-14">запрошено</span>
		</div>
	{:else}
		<span>{user_role[role]}</span>
		&rarr;
		{#if role >= 2}
			<button class="link" on:click={() => (up = false)}>
				{user_role[role - 1]}
			</button>
		{/if}
		{#if role <= 3 && role <= to}
			<button class="link" on:click={() => (up = true)}>
				{user_role[role + 1]}
			</button>
		{/if}
	{/if}
</form>
