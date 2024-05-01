<script>
	import { page } from '$app/stores';
	import { enhance, applyAction } from '$app/forms';
	import { likes } from '$lib/react/data';

	import React from '$lib/react/React.svelte';

	export let dst;
	export let profile;

	let { react, id } = dst;

	let action = $page.url.pathname;
	if (!$page.route.id.endsWith('[id]')) action += '/' + id;
	action += '?/react';
</script>

{#if profile}
	<form class="row" method="post" {action} use:enhance={() => applyAction}>
		<input type="hidden" value={react} name="react" id="react" />

		{#each likes as r (r)}
			<React
				react={r}
				checked={react === r}
				count={dst[r]}
				on:click={() => {
					if (react > 0) dst[react]--;
					if (r === react) {
						react = 0;
					} else {
						react = r;
						dst[react]++;
					}
				}}
			/>
		{/each}
	</form>
{:else}
	<div class="row">
		{#each likes as r (r)}
			{#if dst[r]}
				<React checked={true} react={r} count={dst[r]} />
			{/if}
		{/each}
	</div>
{/if}
