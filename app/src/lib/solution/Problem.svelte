<script>
	import Text from '$lib/text/Text.svelte';
	import Hide from '$lib/page/Hide.svelte';

	import { problem_category } from '$lib/problem/data';

	export let problem;

	const { id, title, condition, weight, categories, notes, answer, proof } = problem;
	const names = [weight, categories.map((c) => problem_category[c]).join(', ')];
	const subtitle = names.join(' – ');
</script>

<div class="col content-900 padding-20 gap-10">
	<a class="col top gap-5" href="/problems/{id}">
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
			<div class="col">
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
</div>
