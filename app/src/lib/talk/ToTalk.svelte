<script>
	import { enhance, applyAction } from '$app/forms';

	import Title from './Title.svelte';
	import Notify from './Notify.svelte';

	import Snippet from './Snippet.svelte';
	import Click from '$lib/page/Click.svelte';

	export let chat;
	export let talk;

	export let profile;

	let clicked;
	let deleted;
</script>

<div class:highlighted={clicked}>
	<form
		method="post"
		action="/talks/{talk.id}?/delete"
		use:enhance={() => applyAction}
		class="col relative padding-20 content-900 gap-5"
	>
		<input type="hidden" value={deleted} name="deleted" id="deleted" />

		<Title {talk} {chat} />

		{#if !deleted}
			<Notify {chat} {talk} {profile} />
			<Click on:click={() => (clicked = !clicked)}>
				<Snippet {chat} {profile} />
			</Click>
		{/if}

		<button
			class:hidden={!clicked}
			class="link top-5"
			type="submit"
			on:click={() => (deleted = clicked = !deleted)}
		>
			{#if deleted}
				Вернуться в чат
			{:else}
				Выйти из чата
			{/if}
		</button>
	</form>
</div>

