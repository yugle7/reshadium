<script>
	import { pb, params } from '$lib';
	import { normText } from '$lib/text/data';

	import { onDestroy, onMount } from 'svelte';
	import ToDraft from './ToDraft.svelte';

	export let drafts;
	export let profile;

	async function subscribe() {
		await pb.collection('drafts').subscribe('*', async ({ action, record }) => {
			if (action === 'update') {
				const i = drafts.findIndex(({ id }) => id === record.id);
				if (i >= 0) drafts[i] = record;
			}
		});
	}
	function unsubscribe() {
		pb.collection('drafts').unsubscribe('*');
	}

	onMount(subscribe);
	onDestroy(unsubscribe);

	$: dst = $params.search
		? drafts.filter(({ title }) => normText(title).includes($params.search))
		: drafts;
</script>

{#if dst.length > 0}
	<ul>
		{#each dst as draft (draft.id)}
			<li class="hover">
				<ToDraft {draft} {profile} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Ничего не найдено</h2>
{/if}
