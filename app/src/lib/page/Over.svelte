<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { params, screen } from '$lib';
	import { afterUpdate } from 'svelte';

	import Close from './Close.svelte';

	export let default_params = {};

	$params = { ...default_params };
	$page.url.searchParams.forEach((v, k) => ($params[k] = v));

	$: disabled = !Object.entries($params).some(
		([k, v]) => v != ($page.url.searchParams.get(k) || default_params[k])
	);

	const handle = async () => {
		const url = new URL($page.url);

		for (const [k, v] of Object.entries($params)) {
			if (v != default_params[k]) {
				url.searchParams.set(k, v);
			} else {
				url.searchParams.delete(k);
			}
		}
		await goto(url);
		$screen = 2;
	};

	let sticky;
	let col;

	afterUpdate(() => {
		sticky = col.scrollHeight > col.scrollTop + col.clientHeight;
	});
</script>

<div class="col over gap-40 padding-20" class:hidden={$screen !== 3} bind:this={col}>
	<Close on:click={() => ($screen = 2)} />
	<slot />
	<button {disabled} class:sticky class="button right" on:click={handle}>Применить</button>
</div>

<style>
	button {
		transition: none;
	}
	.sticky {
		position: fixed;
		bottom: 10px;
		right: 10px;
	}
</style>
