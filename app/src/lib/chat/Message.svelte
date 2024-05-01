<script>
	import { enhance, applyAction } from '$app/forms';
	
	import { reply, select, edit, text, getReply } from './data';
	import { isClick } from '$lib/text/data';

	import Reply from './Reply.svelte';
	import React from './React.svelte';

	import Click from '$lib/page/Click.svelte';

	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Time from '$lib/time/Time.svelte';
	import Text from '$lib/text/Text.svelte';

	export let message;
	export let profile;

	let deleted;
	let clicked;

	const { id, author_id, created, author } = message;
</script>

<div class="col padding-15 gap-5 relative hover" class:highlighted={clicked}>
	{#if deleted}
		<p class="clamp">{message.text}</p>
	{:else}
		<div class="font-16 nowrap">
			<ToAuthor {author} />
			<Time time={created} />
		</div>

		{#if message.reply}
			<Reply message={message.reply} />
		{/if}

		{#if profile}
			<Click
				on:click={() => {
					if (isClick(window)) {
						clicked = !clicked;
						if (clicked) $select = id;
					}
				}}
			>
				<Text text={message.text} />
			</Click>

			<React {clicked} {message} {profile} on:submit={() => (clicked = false)} />
		{:else}
			<Text text={message.text} />
			<React {message} {profile} />
		{/if}
	{/if}

	{#if profile}
		<form
			method="post"
			action="/messages/{id}?/delete"
			use:enhance={() => applyAction}
			class="row gap-15"
			class:hidden={!clicked}
		>
			<input type="hidden" value={deleted} name="deleted" id="deleted" />

			<button
				class="link"
				class:hidden={deleted}
				on:click|preventDefault={() => {
					$reply = getReply(message);
					clicked = false;
				}}
			>
				Ответить
			</button>

			{#if profile.id === author_id || profile.role >= 3}
				<button class="link" on:click={() => (deleted = clicked = !deleted)}>
					{#if deleted}
						Восстановить
					{:else}
						Удалить
					{/if}
				</button>

				<button
					class="link"
					class:hidden={deleted}
					on:click|preventDefault={() => {
						$edit = message.id;
						$text = message.text;
						$reply = message.reply;
						clicked = false;
					}}
				>
					Изменить
				</button>
			{/if}
		</form>
	{/if}
</div>
