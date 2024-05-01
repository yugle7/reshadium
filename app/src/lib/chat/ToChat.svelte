<script>
	export let chat;
	export let type;
</script>

{#if !chat}
	<a class="link top-right padding-5" href="?type={type}">
		<img src="/icons/chat.svg" alt="chat" />
	</a>
{/if}
