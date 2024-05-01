<script>
	import { discussion_topic } from '$lib/discussion/data';

	import Likes from '$lib/react/Likes.svelte';

	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Date from '$lib/time/Date.svelte';

	import Text from '$lib/text/Text.svelte';

	export let discussion;

	export let profile;

	const { id, title, topic, text, author_id, author, created } = discussion;
</script>

<div class="col scroll gap-10 padding-20 content-900">
	<div class="col gap-5">
		<h1 class="title">{title}</h1>
		<span class="subtitle">{discussion_topic[topic]}</span>
	</div>
	<Text {text} />
	<div class="row away center">
		<Likes dst={discussion} {profile} />
		<span class="right line-2 nowrap">
			<ToAuthor {author} />
			<Date time={created} />
		</span>
	</div>
	{#if profile && (profile.role >= 3 || profile.id === author_id)}
		<a href="/discussions/{id}/update" class="button right" on:click>Исправить</a>
	{/if}
</div>
