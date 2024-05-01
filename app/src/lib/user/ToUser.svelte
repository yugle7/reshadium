<script>
	import { params } from '$lib';
	import { user_role } from './data';

	import Author from './Author.svelte';
	import Position from './Position.svelte';

	export let user;

	const { username, role, position, rating, friend } = user;

	const names = [];
	if ($params.role == null) names.push(user_role[role]);
	if (params.friend && friend) names.push('Друг');
	const subtitle = names.join(' – ');
</script>

<a class="link" href="/users/{username}">
	<div class="padding-20 content-600">
		<Position {position} />
		<span class="username right-5"><Author author={user} /></span>
		<span class="font-14">{subtitle}</span>
		<span class="right monospace">{rating || ''}</span>
	</div>
</a>

<style>
	a {
		opacity: 90%;
	}
</style>
