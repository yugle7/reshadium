<script>
	import { user_role, user_sort } from './data';
	import { params } from '$lib';

	import Radio from '$lib/state/Radio.svelte';
	import Flag from '$lib/state/Flag.svelte';
	import Select from '$lib/state/Select.svelte';

	export let profile;

	$: roles = $params.wanted ? user_role.slice(0, profile.role) : user_role;
	$: if ($params.wanted && $params.role >= profile.role) $params.role = null;
</script>

{#if roles}
	<Select key="role" labels={roles} />
{/if}

{#if profile}
	<Flag key="friend" title="Друзья" />

	{#if profile.role >= 2}
		<Flag key="wanted" title="Запрошена роль" />
	{/if}
{/if}

<Radio key="sort" labels={user_sort} />
