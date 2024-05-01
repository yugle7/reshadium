<script>
	export let hidden = true;
	export let label;
</script>

<div>
	<button class="link" on:click|preventDefault={() => (hidden = !hidden)}>
		<h3 class="font-16">{label}</h3>
	</button>

	<div class:hidden class="top-10">
		<slot />
	</div>
</div>

<style>
	button {
		gap: 3px;
	}
</style>
