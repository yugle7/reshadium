<script>
	import { discussion_topic, discussion_sort } from './data';

	import Search from '$lib/state/Search.svelte';
	import Radio from '$lib/state/Radio.svelte';
	import Select from '$lib/state/Select.svelte';
</script>

<Search key="search" title="Поиск" />
<Select key="topic" labels={discussion_topic} />
<Radio key="sort" labels={discussion_sort} />
