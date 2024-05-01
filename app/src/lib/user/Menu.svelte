<script>
	import { screen } from '$lib';

	import Header from '$lib/page/Header.svelte';

	export let user = null;
	export let profile;
</script>

<Header>
	<button on:click={() => ($screen = 1)}>
		<img class="icon" src="/icons/menu.svg" alt="menu" />
	</button>

	<div class="center">
		{#if user}
			Человек
		{:else}
			Это я
		{/if}
	</div>

	{#if profile}
		<button on:click={() => ($screen = 3)}>
			<img class="icon" src="/icons/settings.svg" alt="settings" />
		</button>
	{:else}
		<a href="/login">
			<img class="icon" src="/icons/login.svg" alt="login" />
		</a>
	{/if}
	
</Header>

<style>
	a {
		opacity: 100%;
	}
	a,
	button {
		padding: 5px;
	}
</style>
