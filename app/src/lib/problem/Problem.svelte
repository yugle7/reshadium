<script>
	import { problem_category } from './data';

	import Text from '$lib/text/Text.svelte';
	import Hide from '$lib/page/Hide.svelte';

	import Likes from '$lib/react/Likes.svelte';
	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Date from '$lib/time/Date.svelte';

	export let problem;
	export let solution = null;
	export let profile = null;

	const { title, categories, condition, notes, answer, proof } = problem;
	const { weight, like, author, changed } = problem;
	const names = [weight, categories.map((c) => problem_category[c]).join(', ')];
	if (like) names.push(like);
	const subtitile = names.join(' – ');
</script>

<div class="col padding-20 gap-10 content-900">
	<div class="col gap-5">
		<h1 class="title">{title}</h1>
		<span class="subtitle">{subtitile}</span>
	</div>
	<Text text={condition} />
	{#if notes}
		<Hide label="Примечания">
			<Text text={notes} />
		</Hide>
	{/if}
	{#if profile}
		{#if (answer || proof) && (profile.is_manager || solution.progress === 5)}
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
	{/if}
	<div class="row away center">
		<Likes dst={problem} {profile} />
		<span class="right line-2 nowrap">
			<ToAuthor {author} />
			<Date time={changed} />
		</span>
	</div>
</div>
