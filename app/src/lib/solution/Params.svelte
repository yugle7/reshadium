<script>
	import { problem_category, problem_weight } from '$lib/problem/data';
	import { solution_sort, solution_progress } from './data';

	import Click from '$lib/state/Click.svelte';
	import Radio from '$lib/state/Radio.svelte';
	import Select from '$lib/state/Select.svelte';
	import Flag from '$lib/state/Flag.svelte';
</script>

<Click key="weight" values={problem_weight} title="Вес" />
<Select key="category" labels={problem_category} />
<Radio key="progress" labels={solution_progress} />
<Flag key="reviewed" title="Взята на проверку" />
<Radio key="sort" labels={solution_sort} />
