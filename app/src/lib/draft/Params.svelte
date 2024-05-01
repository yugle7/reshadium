<script>
	import { problem_category } from '$lib/problem/data';
	import { draft_sort } from './data';

	import Search from '$lib/state/Search.svelte';
	import Radio from '$lib/state/Radio.svelte';
	import Select from '$lib/state/Select.svelte';
	import Flag from '$lib/state/Flag.svelte';
</script>

<Search key="search" title="Поиск" />
<Select key="category" labels={problem_category} />
<Flag key="applied" title="Применено" />
<Radio key="sort" labels={draft_sort} />
