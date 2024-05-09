<script>
	import { screen, params } from '$lib';
	import { normText } from '$lib/text/data';

	import ToProblem from './ToProblem.svelte';

	export let problems;
	export let profile;

	$: dst = $params.search
		? problems.filter(({ title }) => normText(title).includes($params.search))
		: problems;
</script>

{#if dst.length > 0}
	<ul class="top-5" hidden={$screen & 1}>
		{#each dst as problem (problem.id)}
			<li class="hover">
				<ToProblem {problem} {profile} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Ничего не найдено</h2>
{/if}
