<script>
	import { screen } from '$lib';

	import Header from '$lib/page/Header.svelte';

	export let types = null;
</script>

<Header>
	<button class="padding-5" on:click={() => ($screen = 1)}>
		<img class="icon" src="/icons/menu.svg" alt="menu" />
	</button>

	<div class="center">
		<slot />
	</div>

	{#if types}
		{#if types.length === 1}
			<a class="padding-5" href="?type={types[0]}">
				<img class="icon" src="/icons/chat.svg" alt="chat" />
			</a>
		{:else}
			<button class="padding-5" on:click={() => ($screen = 3)}>
				<img class="icon" src="/icons/chat.svg" alt="chat" />
			</button>
		{/if}
	{:else}
		<button class="padding-5" on:click={() => ($screen = 3)}>
			<img class="icon" src="/icons/params.svg" alt="params" />
		</button>
	{/if}
</Header>
