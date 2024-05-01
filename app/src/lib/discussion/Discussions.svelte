<script>
	import { pb, params } from '$lib';

	import { onDestroy, onMount } from 'svelte';
	import { normText } from '$lib/text/data';

	import ToDiscussion from './ToDiscussion.svelte';

	export let discussions;
	export let profile;

	async function subscribe() {
		await pb.collection('discussions').subscribe('*', async ({ action, record }) => {
			if (action === 'update' && ($params.type == null || record.type == $params.type)) {
				const i = discussions.findIndex(({ id }) => id === record.id);
				if (i >= 0) discussions[i] = record;
			}
		});
	}
	function unsubscribe() {
		pb.collection('discussions').unsubscribe('*');
	}

	onMount(subscribe);
	onDestroy(unsubscribe);

	$: dst = $params.search
		? discussions.filter(({ title }) => normText(title).includes($params.search))
		: discussions;
</script>

{#if dst.length > 0}
	<ul>
		{#each dst as discussion (discussion.id + discussion.changed)}
			<li class="hover">
				<ToDiscussion {discussion} {profile} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Ничего не найдено</h2>
{/if}
