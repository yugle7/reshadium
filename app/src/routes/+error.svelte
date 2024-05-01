<script>
	import { page } from '$app/stores';

	const { status, error } = $page;
</script>

<div class="center col gap-20 top-40">
	<h1 class="title">{status}</h1>
	<p class="subtitle">{error.message}</p>
</div>

<style>
	h1 {
		font-size: 48px;
	}
</style>
