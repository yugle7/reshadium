<script>
	import { problem_category } from '$lib/problem/data';

	import Likes from '$lib/react/Likes.svelte';
	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Date from '$lib/time/Date.svelte';

	import Text from '$lib/text/Text.svelte';

	export let draft;
	export let profile;

	const { id, title, condition, categories, like, editor, created } = draft;

	const names = [];
	names.push(categories.map((c) => problem_category[c]).join(', '));
	if (like) names.push(like);

	const subtitle = names.join(' – ');
</script>

<div class="col content-900 relative padding-20 gap-10">
	<a class="col top gap-5" href="/drafts/{id}">
		<h2 class="title">{title}</h2>
		<span class="subtitle">{subtitle}</span>
	</a>
	<Text text={condition} />
	<p class="row away center">
		<Likes dst={draft} {profile} />
		<span class="right line-2 nowrap">
			<ToAuthor author={editor} />
			<Date time={created} />
		</span>
	</p>
</div>
