<script>
	import { params, screen } from '$lib';
	import { normText } from '$lib/text/data';

	export let key = 'search';
	export let title;

	let value = $params[key];

	const handleSearch = async (e) => {
		if (e.key === 'Enter') {
			$params[key] = normText(value);
			e.preventDefault();
			return true;
		}
	};
</script>

<input
	class="input"
	placeholder={title}
	id={key}
	type="search"
	bind:value
	on:blur={() => ($params[key] = normText(value))}
	on:keydown={handleSearch}
	on:click|stopPropagation
/>

<style>
	@media (min-width: 700px) {
		input {
			margin-left: -10px;
			width: calc(100% + 10px);
		}
	}
</style>
