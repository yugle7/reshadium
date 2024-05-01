<script>
	import { params } from '$lib';

	export let key;
	export let labels;
	export let title;

	let selected = $params[key] != null;
</script>

<input hidden name={key} bind:value={$params[key]} />

{#if selected}
	<button class="link font-14" on:click|preventDefault={() => (selected = false)}>
		{labels[$params[key]]}
	</button>
{:else}
	<div class="col gap-10">
		{#if $params[key]}
			<button class="link font-14" on:click|preventDefault={() => (selected = true)}>
				{title}
			</button>
		{:else}
			<span class="subtitle">{title}</span>
		{/if}

		{#each Object.entries(labels) as [value, label] (value)}
			<label class="link" class:selected={$params[key] == value}>
				<input type="radio" {value} bind:group={$params[key]} on:change={() => (selected = true)} />
				{label}
			</label>
		{/each}
	</div>
{/if}

<style>
	input[type='radio'] {
		visibility: hidden;
	}
	label:before {
		content: '–';
	}
</style>
