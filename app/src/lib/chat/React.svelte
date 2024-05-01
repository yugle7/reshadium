<script>
	import { enhance, applyAction } from '$app/forms';
	import { message_react } from './data';

	import React from '$lib/react/React.svelte';

	export let message;
	export let profile;

	export let clicked = false;

	let { id, react } = message;

	$: reacts = message_react.filter((r) => message[r] > 0).sort((a, b) => message[b] - message[a]);
</script>

{#if profile}
	<form
		method="post"
		action="/messages/{id}?/react"
		class="row"
		use:enhance={() => applyAction}
		on:submit
	>
		<input type="hidden" value={react} name="react" id="react" />

		{#if clicked}
			{#each message_react as r (r)}
				<React react={r} {clicked} on:click={() => (react = r)} />
			{/each}
		{:else if reacts.length > 0}
			{#each reacts as r (r)}
				<React
					react={r}
					checked={react === r}
					count={message[r]}
					on:click={() => (react = react === r ? 0 : r)}
				/>
			{/each}
		{/if}
	</form>
{:else}
	<div class="row">
		{#each reacts as r (r)}
			<React checked={true} react={r} count={message[r]} />
		{/each}
	</div>
{/if}
