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

<button
	{disabled}
	class="row gap-2 padding-3 link"
	class:checked
	on:click|stopPropagation
>
	<img
		class={count || clicked ? color : ''}
		class:clicked
		src="/icons/{icon}.svg"
		alt={icon}
	/>
	{#if count > 1}<span class="monospace font-14 line-1">{count}</span>{/if}
</button>

<style>
	.clicked {
		width: 30px;
	}
	.checked {
		opacity: 100%;
	}
	button {
		padding-right: 10px;
		padding-left: 0;
		color: var(--color-75);
	}

	img {
		width: 20px;
		min-width: 20px;
		padding-bottom: 5px;
	}
</style>
