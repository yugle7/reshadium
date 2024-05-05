<script>
	import { react_color, react_icon } from '$lib/react/data';

	export let react;
	export let count = 0;

	export let disabled = false;
	export let checked = false;
	export let clicked = false;

	const icon = react_icon[react];
	const color = react_color[icon];
</script>

<button {disabled} class="row gap-2 right-10 link" class:checked on:click|stopPropagation>
	<img class={count || clicked ? color : ''} class:clicked src="/icons/{icon}.svg" alt={icon} />
	{#if count > 1}<span class="monospace font-16">{count}</span>{/if}
</button>

<style>
	.clicked {
		width: 30px;
	}
	.checked {
		opacity: 100%;
	}
	button {
		align-items: flex-end; 
	}
	img {
		width: 24px;
		min-width: 24px;
	}
</style>
