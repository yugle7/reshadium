<script>
	import { screen, params } from '$lib';

	import { solution_progress } from '$lib/solution/data';
	import {
		default_params,
		problem_sort,
		problem_category,
		problem_status,
		weight_name
	} from '$lib/problem/data';

	import Top from '$lib/menu/Top.svelte';

	import Scroll from '$lib/page/Scroll.svelte';
	import Resize from '$lib/page/Resize.svelte';

	import Problems from '$lib/problem/Problems.svelte';
	import Params from '$lib/problem/Params.svelte';

	import Over from '$lib/page/Over.svelte';
	import Side from '$lib/page/Side.svelte';

	export let data;
	$: profile = data.profile;

	let title;
	$: if ($params) {
		const { sort, status, weight, category, progress, author_id, search } = $params;
		const names = [problem_sort[sort]];
		if (status != default_params.status) names.push(problem_status[status]);
		if (weight != null) names.push(weight_name[weight]);
		if (category != null) names.push(problem_category[category]);
		if (progress) names.push(solution_progress.filter((p, i) => progress & (1 << i)).join(', '));
		if (search) names.push('Поиск');
		if (author_id) names.push('Автор');
		title = names.join(' – ');
	}
</script>

<svelte:head>
	<title>Задачи – {title}</title>
</svelte:head>

{#if $screen}
	<Top>Задачи</Top>
	<h1 class="info">{title}</h1>
	{#await data.problems}
		<h2 class="info">Получаем</h2>
	{:then problems}
		<Problems {problems} {profile} />
	{/await}
	<Over {default_params}>
		<Params {profile} />
	</Over>
{:else}
	<Scroll>
		{#await data.problems}
			<h2 class="info">Получаем</h2>
		{:then problems}
			<Problems {problems} {profile} />
		{/await}
	</Scroll>
	<Resize>
		<Side {default_params}>
			<Params {profile} />
		</Side>
	</Resize>
{/if}
