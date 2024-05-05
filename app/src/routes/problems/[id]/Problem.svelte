<script>
	import Problem from '$lib/problem/Problem.svelte';
	import Status from '$lib/problem/Status.svelte';
	import Solution from '$lib/problem/Solution.svelte';

	export let form;
	export let problem;
	export let profile;
	export let solution;
</script>

<Problem {problem} {solution} {profile} />
{#if profile}
	{#if profile.is_manager}
		<Status {problem} {profile} />
	{/if}
	<Solution {solution} {form} />
{:else}
	<div class="padding-20 content-900">
		<a class="button right" href="/login">Решить</a>
	</div>
{/if}
