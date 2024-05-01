<script>
	import { screen, params } from '$lib';
	import { discussion_topic, discussion_sort, default_params } from '$lib/discussion/data';

	import Top from '$lib/menu/Top.svelte';

	

	import Scroll from '$lib/page/Scroll.svelte';
	import Resize from '$lib/page/Resize.svelte';

	import Discussions from '$lib/discussion/Discussions.svelte';
	import Params from '$lib/discussion/Params.svelte';

	import Over from '$lib/page/Over.svelte';
	import Side from '$lib/page/Side.svelte';

	export let data;
	$: profile = data.profile;

	let title;
	$: if ($params) {
		const { topic, sort } = $params;
		const names = [discussion_sort[sort]];
		if (topic != null) names.push(discussion_topic[topic]);
		title = names.join(' – ');
	}
</script>

<svelte:head>
	<title>Общение – {title}</title>
</svelte:head>

{#if $screen}
	<Top>Общение</Top>
	<h1 class="info">{title}</h1>
	{#await data.discussions}
		<h2 class="info">Получаем</h2>
	{:then discussions}
		<Discussions {discussions} {profile} />
	{/await}
	<Over {default_params}>
		<Params />
	</Over>
{:else}
	<Scroll>
		{#await data.discussions}
			<h2 class="info">Получаем</h2>
		{:then discussions}
			<Discussions {discussions} {profile} />
		{/await}
	</Scroll>
	<Resize>
		<Side {default_params}>
			<Params />
		</Side>
	</Resize>
{/if}
