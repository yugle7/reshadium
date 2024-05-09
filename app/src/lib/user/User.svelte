<script>
	import Role from './Role.svelte';
	import Wanted from './Wanted.svelte';

	import Profile from './Profile.svelte';

	export let user;
	export let profile;
</script>

<div class="col scroll gap-30 padding-20 content-900">
	<Profile {user} {profile} />
	{#if user}
		{#if profile && profile.role >= 2 && profile.role > user.role}
			<Role {user} />
		{/if}
	{:else if profile.to}
		<Wanted {profile} />
	{/if}
</div>
