<script>
	import ToUser from './ToUser.svelte';

	export let users;
	export let profile;
</script>

{#if users.length > 0}
	<ul>
		{#each users as user (user.id)}
			<li class:highlighted={user.id === profile?.id} class="hover">
				<ToUser {user} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Никого не найдено</h2>
{/if}
