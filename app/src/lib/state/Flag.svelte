<script>
	import { params } from '$lib';

	export let key;
	export let title;
</script>

<button
	class="link"
	class:selected={$params[key]}
	on:click|preventDefault={() => ($params[key] = !$params[key])}
>
	{title}
</button>
