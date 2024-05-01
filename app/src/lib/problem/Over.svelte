<script>
	import { screen } from '$lib';
	import { chat_type } from '$lib/chat/data';
	import Close from '$lib/page/Close.svelte';

	export let problem;
	export let profile;

	const { id, solutions, drafts, chat_types } = problem;
</script>

<Close on:click={() => ($screen = 2)} />

<div class="col gap-20 padding-20 center">
	{#each chat_types as type (type)}
		<a class="link" href="?type={type}">{chat_type[type]}</a>
	{/each}

	<span />

	{#if profile.is_manager}
		{#if solutions > 0}
			<a class="link" href="/solutions?problem_id={id}">Проверить решения</a>
		{/if}
		{#if drafts == 0}
			<a class="link" href="/drafts?problem_id={id}">Посмотреть правки</a>
		{/if}
		<a class="link" href="/problems/{id}/update">Исправить задачу</a>
	{/if}
</div>
