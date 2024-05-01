<script>
	import { params } from '$lib';
	import { discussion_topic } from './data';

	import Likes from '$lib/react/Likes.svelte';

	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Date from '$lib/time/Date.svelte';

	import Text from '$lib/text/Text.svelte';

	export let discussion;
	export let profile;

	const { id, title, text, topic, author, updated } = discussion;
	$: subtitle = $params.topic == null ? discussion_topic[topic] : '';
</script>

<div class="col relative content-900 gap-10 padding-20">
	<a class="col top gap-5" href="/discussions/{id}?type=1">
		<h2 class="title">{title}</h2>
		<span class="subtitle">{subtitle}</span>
	</a>
	<Text {text} />
	<div class="row away center">
		<Likes dst={discussion} {profile} />
		<span class="right line-2 nowrap">
			<ToAuthor {author} />
			<Date time={updated} />
		</span>
	</div>
</div>
