<script>
	import { enhance } from '$app/forms';
	import { user_role } from './data';

	export let user;
	let { id, role, to, wanted } = user;
</script>

<form method="post" action="?/role" class="row gap-15 wrap center" use:enhance>
	<input type="hidden" bind:value={id} name="id" id="id" />
	<input type="hidden" bind:value={to} name="to" id="to" />

	<div class="col center">
		<span>{user_role[to]}</span>
		{#if to > role}
			<span class="link font-14">предложено</span>
		{/if}
	</div>
	&rarr;
	{#if to >= 1}
		<button
			class="link"
			on:click={() => {
				wanted = false;
				to--;
			}}
		>
			{user_role[to - 1]}
		</button>
	{/if}
	{#if to <= 2}
		<button
			class="link"
			on:click={() => {
				wanted = false;
				to++;
			}}
		>
			<div class="col center">
				<span>{user_role[to + 1]}</span>
				{#if wanted}
					<span class="link font-14">запрошено</span>
				{/if}
			</div>
		</button>
	{/if}
</form>
