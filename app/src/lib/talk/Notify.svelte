<script>
	import Ago from '$lib/time/Ago.svelte';

	export let chat;
	export let talk;

	export let profile;
</script>

<div class="col top-right-20">
	<Ago time={chat.changed} />
	{#if talk.message_id}
		<img src="/icons/at.svg" alt="notify" />
	{:else if chat.sent > talk.read}
		<span class="circle">{chat.sent - talk.read}</span>
	{:else if chat.sender_id === profile.id}
		<img src="/icons/{chat.sent > chat.read ? 'sent' : 'read'}.svg" alt="read" />
	{/if}
</div>

<style>
	span {
		width: auto;
		float: right;
	}
	img {
		min-width: 20px;
		max-width: 20px;
	}
</style>
