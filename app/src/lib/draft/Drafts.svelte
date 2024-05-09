<script>
	import { screen, params } from '$lib';
	import { normText } from '$lib/text/data';

	import ToDraft from './ToDraft.svelte';

	export let drafts;
	export let profile;

	$: dst = $params.search
		? drafts.filter(({ title }) => normText(title).includes($params.search))
		: drafts;
</script>

{#if dst.length > 0}
	<ul class="top-5" hidden={$screen & 1}>
		{#each dst as draft (draft.id)}
			<li class="hover">
				<ToDraft {draft} {profile} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Ничего не найдено</h2>
{/if}
