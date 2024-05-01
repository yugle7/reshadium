<script>
	import { params } from '$lib';

	export let key;
	export let values;
	export let title;
</script>

<div class="row gap-5 font-16 center">
	<span class="label right-5">{title}</span>
	{#each values as value (value)}
		<button
			class="button"
			class:selected={$params[key] == value}
			on:click|preventDefault={() => ($params[key] = value === $params[key] ? null : value)}
		>
			{value}
		</button>
	{/each}
</div>

<style>
	button {
		width: 34px;
		padding: 8px 0;
		transition: none;
	}
	div {
		min-width: fit-content;
	}
</style>
