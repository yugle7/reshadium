<script>
	import { page } from '$app/stores';
	import { screen } from '$lib';

	const { status, error } = $page;
</script>

<div class="center col gap-20 top-40">
	<h1 class="title">{status}</h1>
	<p class="subtitle">{error.message}</p>

	{#if $screen}
		<button on:click={() => ($screen = 1)}><img src="/icons/menu.svg" alt="menu" /></button>
	{/if}
</div>

<style>
	h1 {
		font-size: 48px;
	}
</style>
