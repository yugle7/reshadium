<script>
	import { pb, params } from '$lib';
	import { normText } from '$lib/text/data';

	import { onDestroy, onMount } from 'svelte';
	import ToSolution from './ToSolution.svelte';

	export let solutions;

	async function subscribe() {
		await pb.collection('solutions').subscribe('*', async ({ action, record }) => {
			if (action === 'update') {
				const i = solutions.findIndex(({ id }) => id === record.id);
				if (i >= 0) solutions[i] = record;
			}
		});
	}
	function unsubscribe() {
		pb.collection('solutions').unsubscribe('*');
	}

	onMount(subscribe);
	onDestroy(unsubscribe);

	$: dst = $params.search
		? solutions.filter(({ title }) => normText(title).includes($params.search))
		: solutions;
</script>

{#if dst.length > 0}
	<ul>
		{#each dst as solution (solution.id + solution.updated)}
			<li class="hover">
				<ToSolution {solution} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Ничего не найдено</h2>
{/if}
