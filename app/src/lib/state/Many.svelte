<script>
	import { params } from '$lib';
	import { getMask } from '$lib/text/data';

	export let key;
	export let labels;
	export let title;

	$params[key] = $params[key] || [];
	$: mask = $params[key] && getMask($params[key]);
	let hidden = $params[key]?.length;
</script>

<button class="link font-14" on:click|preventDefault={() => (hidden = !hidden)}>
	{#if hidden && $params[key]?.length}
		{$params[key].map((v) => labels[v]).join(', ')}
	{:else}
		{title}
	{/if}
</button>

<div class="col gap-10" class:hidden>
	{#each Object.entries(labels) as [value, label] (value)}
		<label class="link" class:selected={mask & (1 << value)}>
			<input type="checkbox" name={key} {value} bind:group={$params[key]} />
			{label}
		</label>
	{/each}
</div>

<style>
	input[type='checkbox'] {
		visibility: hidden;
	}
	label:before {
		content: '–';
	}
</style>
