<script>
	import { enhance } from '$app/forms';
	import { params, screen, loaded } from '$lib';
	import { problem_category } from '$lib/problem/data';

	import Text from '$lib/state/Text.svelte';
	import Many from '$lib/state/Many.svelte';

	export let data;

	const { id, title, categories, condition, notes, answer, proof } = data.problem;
	const draft = { title, categories, condition, notes, answer, proof };
	$params = structuredClone(draft);

	$: disabled =
		JSON.stringify($params) === JSON.stringify(draft) ||
		!$params.categories.length ||
		!$params.title ||
		!$params.condition;
	$loaded = true;
</script>

<svelte:head>
	<title>Правка – {title}</title>
</svelte:head>

{#if $screen}
	<a class="top-right" href="/problems/{id}">
		<img src="/icons/close.svg" alt="close" />
	</a>
{/if}

{#if $loaded}
	<div class="page">
		<form method="post" class="col content-900 padding-20 gap-40" use:enhance>
			<div class="col gap-20">
				<Text key="title" title="Название" />
				<Many key="categories" title="Категории" labels={problem_category} />
				<Text key="condition" title="Условие" />
				<Text key="notes" title="Примечания" />
				<Text key="answer" title="Ответ" />
				<Text key="proof" title="Доказательство" />
			</div>
			<div class="row gap-15 center right">
				{#if !$screen}
					<a class="link" href="/problems/{id}">Отменить</a>
				{/if}
				<button class="button" {disabled} type="submit">Поправить</button>
			</div>
		</form>
	</div>
{/if}
