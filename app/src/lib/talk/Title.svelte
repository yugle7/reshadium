<script>
	import { params } from '$lib';
	import { chat_type, getTitle, getUrl } from '$lib/chat/data';

	export let chat;
	export let talk;
</script>

<a class="col top gap-5" href={getUrl(chat)}>
	<h2 class="title right-80">{getTitle(chat, talk)}</h2>
	{#if $params.type == null && chat.type}
		<span class="subtitle">{chat_type[chat.type]}</span>
	{/if}
</a>
