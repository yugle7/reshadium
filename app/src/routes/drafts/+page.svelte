<script>
	import { screen, params } from '$lib';

	import { draft_sort, default_params } from '$lib/draft/data';
	import { problem_category } from '$lib/problem/data';

	import Top from '$lib/menu/Top.svelte';

	import Scroll from '$lib/page/Scroll.svelte';
	import Resize from '$lib/page/Resize.svelte';

	import Drafts from '$lib/draft/Drafts.svelte';
	import Params from '$lib/draft/Params.svelte';

	import Side from '$lib/page/Side.svelte';
	import Over from '$lib/page/Over.svelte';

	export let data;
	const { profile } = data;

	let title;
	$: if ($params) {
		const { search, sort, category, editor_id } = $params;
		const names = [draft_sort[sort]];
		if (category != null) names.push(problem_category[category]);
		if (search) names.push('Поиск');
		if (editor_id) names.push('Редактор');
		title = names.join(' – ');
	}
</script>

<svelte:head>
	<title>Правки – {title}</title>
</svelte:head>

{#if $screen}
	<Top>Правки</Top>
	<h1 class="info">{title}</h1>
	{#await data.drafts}
		<h2 class="info">Получаем</h2>
	{:then drafts}
		<Drafts {drafts} {profile} />
	{/await}
	<Over {default_params}>
		<Params />
	</Over>
{:else}
	<Scroll>
		{#await data.drafts}
			<h2 class="info">Получаем</h2>
		{:then drafts}
			<Drafts {drafts} {profile} />
		{/await}
	</Scroll>
	<Resize>
		<Side {default_params}>
			<Params />
		</Side>
	</Resize>
{/if}
