<script>
	import Author from './Author.svelte';

	export let author;
	const { username } = author;
</script>

<a class="link" href="/users/{username}"><Author {author} /></a>

<style>
	a {
		opacity: 75%;
		padding-right: 5px;
	}
	a:hover {
		opacity: 100%;
	}
</style>
