<script>
	import { params } from '$lib';

	import { problem_category } from './data';
	import { solution_progress } from '$lib/solution/data';

	import Likes from '$lib/react/Likes.svelte';
	import ToAuthor from '$lib/user/ToAuthor.svelte';

	import Date from '$lib/time/Date.svelte';
	import Text from '$lib/text/Text.svelte';

	export let problem;
	export let profile;

	const { id, title, condition, author, changed } = problem;

	const isPowerOfTwo = (n) => n > 0 && !(n & (n - 1));

	let subtitle;
	$: if ($params) {
		const { weight, categories, like, progress } = problem;
		const names = [weight];
		names.push(categories.map((c) => problem_category[c]).join(', '));
		if (!isPowerOfTwo($params.progress) && progress != null) names.push(solution_progress[progress]);
		if (like) names.push(like);
		subtitle = names.join(' – ');
	}
</script>

<div class="col relative content-900 padding-20 gap-10">
	<a class="col top gap-5" href="/problems/{id}">
		<h2 class="title">{title}</h2>
		<span class="subtitle">{subtitle}</span>
	</a>

	<Text text={condition} />

	<div class="row away center">
		<Likes dst={problem} {profile} />
		<span class="right line-2 nowrap">
			<ToAuthor {author} />
			<Date time={changed} />
		</span>
	</div>
</div>
