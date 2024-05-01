<script>
	import { enhance } from '$app/forms';
	import { screen, params, loaded } from '$lib';
	import { discussion_topic } from '$lib/discussion/data';

	import One from '$lib/state/One.svelte';
	import Text from '$lib/state/Text.svelte';

	export let data;
	const { id, title, topic, text } = data.discussion;

	const discussion = { title, topic, text };
	$params = structuredClone(discussion);

	$: disabled =
		JSON.stringify($params) === JSON.stringify(discussion) || !$params.title || !$params.text;
	$loaded = true;
</script>

<svelte:head>
	<title>Общение - {title}</title>
</svelte:head>

{#if $screen}
	<a class="top-right" href="/discussions/{id}">
		<img src="/icons/close.svg" alt="close" />
	</a>
{/if}

{#if $loaded}
	<div class="page">
		<form method="post" class="col padding-20 gap-30 content-900" use:enhance>
			<Text key="title" title="Заголовок" />
			<One key="topic" title="Раздел" labels={discussion_topic} />
			<Text key="text" title="Описание" />
			<div class="row gap-15 center right">
				{#if !$screen}
					<a class="link" href="/discussions/{id}">Отменить</a>
				{/if}
				<button class="button" {disabled} type="submit">Исправить</button>
			</div>
		</form>
	</div>
{/if}
