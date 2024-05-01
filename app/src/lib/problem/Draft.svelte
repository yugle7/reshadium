<script>
	import Text from '$lib/text/Text.svelte';
	import Hide from '$lib/page/Hide.svelte';

	import Likes from '$lib/react/Likes.svelte';

	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Date from '$lib/time/Date.svelte';

	import { problem_category } from '$lib/problem/data';

	export let draft;
	export let profile;
	export const problem = null;

	const { problem_id, changed, editor } = draft;
	const { title, condition, notes, answer, proof, like, categories } = draft;

	const names = [categories.map((c) => problem_category[c]).join(', ')];
	if (like) names.push(like);
	const subtitle = names.join(' – ');
</script>

<a class="col top gap-5" href="/problems/{problem_id}">
	<h1 class="title">{title}</h1>
	<span class="subtitle">{subtitle}</span>
</a>

<Text text={condition} />

{#if notes}
	<Hide label="Примечания">
		<Text text={notes} />
	</Hide>
{/if}

{#if answer || proof}
	<Hide label="Решение">
		<div class="col gap-10">
			{#if answer}
				<div class="col">
					<span class="label">Ответ</span>
					<Text text={answer} />
				</div>
			{/if}
			{#if proof}
				<div class="col">
					<span class="label">Доказательство</span>
					<Text text={proof} />
				</div>
			{/if}
		</div>
	</Hide>
{/if}

<p class="row away center">
	<Likes dst={draft} {profile} />
	<span class="right line-2 nowrap">
		<ToAuthor author={editor} />
		<Date time={changed} />
	</span>
</p>
