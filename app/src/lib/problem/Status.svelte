<script>
	import { enhance, applyAction } from '$app/forms';
	import { problem_status } from './data';
	import { getPlural } from '$lib/text/data';

	export let problem;
	export let profile;

	let { status } = problem;
	const { id, like, answer, proof, drafts, solutions } = problem;
	const { role } = profile;

	const getStatuses = () => {
		switch (status) {
			case 0:
				return answer || proof ? [1] : [];
			case 1:
				return role >= 2 ? [0, 2, 3, 4] : [0, 2, 3];
			case 2:
			case 3:
				return [1];
			case 4:
				return role >= 3 || like > 80 ? [1, 5] : [1];
			case 5:
				return role >= 3 || like < 50 ? [1] : [];
			default:
				return [];
		}
	};
	let statuses = getStatuses();
</script>

<div class="col padding-20 gap-10 content-900">
	{#if drafts || solutions}
		<div>
			{#if drafts}
				<a class="link right-5 comma nowrap" href="/drafts?problem_id={id}">
					<span class="monospace">{drafts}</span>
					{getPlural(drafts, ['правка', 'правки', 'правок'])}
				</a>
			{/if}
			{#if solutions}
				<a class="link right-5 comma nowrap" href="/solutions?problem_id={id}">
					<span class="monospace">{solutions}</span>
					{getPlural(solutions, ['решение', 'решения', 'решений'])}
				</a>
			{/if}
		</div>
	{/if}
	<form
		method="post"
		action="?/status"
		class="row gap-10 wrap"
		use:enhance={() => {
			statuses = getStatuses();
			return applyAction;
		}}
	>
		<input type="hidden" bind:value={status} name="status" id="status" />
		<span>{problem_status[status]}</span>
		{#if statuses.length > 0}
			&rarr;
			{#each statuses as s (s)}
				<button class="link" type="submit" on:click={() => (status = s)}>
					{problem_status[s]}
				</button>
			{/each}
		{/if}
	</form>
</div>
