<script>
	import { enhance } from '$app/forms';
	import { solution_progress } from './data';

	import { getTime } from '$lib/time/data';

	import ToAuthor from '$lib/user/ToAuthor.svelte';
	import Date from '$lib/time/Date.svelte';
	import Author from '$lib/user/Author.svelte';

	import Progress from './Progress.svelte';
	import Label from '$lib/text/Label.svelte';

	export let solution;
	export let problem;
	export let profile;

	$: reviewer_id = solution.reviewer_id;

	$: answer = solution.answer;
	$: proof = solution.proof;
</script>

<div class="highlighted">
	<div class="col gap-10 padding-20 content-900">
		<Label text={answer} label="Ответ" />
		<Label text={proof} label="Доказательство" />

		<span class="line-1">
			{#if reviewer_id !== profile.id}
				<span class="subtitle">{solution_progress[solution.progress]}</span>
			{/if}
			<span class="right line-2 nowrap">
				<ToAuthor author={solution.author} />
				<Date time={getTime(solution.changed)} />
			</span>
		</span>

		<span />

		<div class="line-2">
			{#if profile.id !== solution.author_id}
				{#if reviewer_id}
					{#if profile.id === reviewer_id}
						{#if reviewer_id === profile.id}
							<Progress {solution} {problem} {profile} />
						{/if}
					{:else}
						<span class="subtitle">Взято – <Author author={solution.reviewer} /></span>
					{/if}
				{/if}
				<form method="post" action="?/review" class="row gap-15 right" use:enhance>
					{#if !reviewer_id}
						<button class="button">Взять</button>
					{:else if profile.id === reviewer_id}
						<button class="button">Отдать</button>
					{:else if profile.role > solution.reviewer.role}
						<button class="button">Отобрать</button>
					{/if}
				</form>
			{/if}
		</div>
	</div>
</div>
