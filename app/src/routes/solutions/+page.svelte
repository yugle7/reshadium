<script>
	import { screen, params } from '$lib';

	import { solution_sort, default_params } from '$lib/solution/data';
	import { problem_category } from '$lib/problem/data';

	import Top from '$lib/menu/Top.svelte';
	import Scroll from '$lib/page/Scroll.svelte';

	import Over from '$lib/page/Over.svelte';
	import Side from '$lib/page/Side.svelte';
	import Resize from '$lib/page/Resize.svelte';

	import Solutions from '$lib/solution/Solutions.svelte';
	import Params from '$lib/solution/Params.svelte';

	export let data;

	let title;
	$: if ($params) {
		const { sort, weight, category, author_id } = $params;
		const names = [solution_sort[sort]];
		if (weight != null) names.push(`Вес ${weight}`);
		if (category != null) names.push(problem_category[category]);
		if (author_id) names.push('Автор');
		title = names.join(' – ');
	}
</script>

<svelte:head>
	<title>Решения – {title}</title>
</svelte:head>

{#if $screen}
	<Top>Решения</Top>
	<h1 class="info">{title}</h1>
	{#await data.solutions}
		<h2 class="info">Получаем</h2>
	{:then solutions}
		<Solutions {solutions} />
	{/await}
	<Over {default_params}>
		<Params />
	</Over>
{:else}
	<Scroll>
		{#await data.solutions}
			<h2 class="info">Получаем</h2>
		{:then solutions}
			<Solutions {solutions} />
		{/await}
	</Scroll>
	<Resize>
		<Side {default_params}>
			<Params />
		</Side>
	</Resize>
{/if}
