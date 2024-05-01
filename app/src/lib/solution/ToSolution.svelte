<script>
	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Date from '$lib/time/Date.svelte';

	import Label from '$lib/text/Label.svelte';

	import { problem_category } from '$lib/problem/data';
	import { solution_progress } from './data';

	export let solution;

	const { id, problem, answer, proof } = solution;

	const { weight, categories, title } = problem;
	const names = [weight];
	names.push(categories.map((c) => problem_category[c]).join(', '));
	const subtitle = names.join(' – ');
</script>

<div class="col relative content-900 padding-20 gap-10">
	<a class="col top gap-5" href="/solutions/{id}">
		<h2 class="title">{title}</h2>
		<span class="subtitle">{subtitle}</span>
	</a>

	<Label text={answer} label="Ответ" />
	<Label text={proof} label="Доказательство" />

	<span class="line-1">
		<span class="subtitle">{solution_progress[solution.progress]}</span>
		<span class="right line-2 nowrap">
			<ToAuthor author={solution.author} />
			<Date time={solution.created} />
		</span>
	</span>
</div>
