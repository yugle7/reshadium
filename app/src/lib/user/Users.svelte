<script>
	import { screen } from '$lib';
	import ToUser from './ToUser.svelte';

	export let users;
	export let profile;
</script>

{#if users.length > 0}
	<ul class="top-5" hidden={$screen & 1}>
		{#each users as user (user.id)}
			<li class:highlighted={user.id === profile?.id} class="hover">
				<ToUser {user} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Никого не найдено</h2>
{/if}
