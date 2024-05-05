<script>
	import { problem_status, problem_sort, problem_weight, problem_category, problem_rule } from './data';
	import { solution_progress } from '$lib/solution/data';

	import Search from '$lib/state/Search.svelte';
	import Click from '$lib/state/Click.svelte';
	import Radio from '$lib/state/Radio.svelte';
	import Select from '$lib/state/Select.svelte';
	import Selects from '$lib/state/Selects.svelte';

	export let profile;
</script>

<Search key="search" title="Поиск" />
<Click key="weight" title="Вес" values={problem_weight} />
<Select key="category" labels={problem_category} />
{#if profile}
	{#if profile.role >= 2}
		<Radio key="status" labels={problem_status} />
	{/if}
	<Select key="rule" labels={problem_rule} />
	<Selects key="progress" labels={solution_progress} />
{/if}
<Radio key="sort" labels={problem_sort} />
