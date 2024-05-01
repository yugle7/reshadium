<script>
	import { onDestroy, onMount } from 'svelte';
	import { pb, screen } from '$lib';

	import Top from '$lib/menu/Top.svelte';
	import Chat from '$lib/chat/Chat.svelte';
	import ToChat from '$lib/chat/ToChat.svelte';

	import Problem from '$lib/solution/Problem.svelte';
	import Solution from '$lib/solution/Solution.svelte';

	import Resize from '$lib/page/Resize.svelte';
	import Scroll from '$lib/page/Scroll.svelte';

	export let data;
	let { solution } = data;
	const { problem } = data;
	$: profile = data.profile;

	$: chat = data.chat;
	$: talk = data.talk;

	async function subscribe() {
		await pb.collection('solutions').subscribe(solution.id, async ({ action, record }) => {
			if (action === 'update') {
				const { reviewer_id, reviewer } = record;

				if (reviewer_id && reviewer_id !== profile.id && reviewer_id !== solution.reviewer_id) {
					const { role } = await pb.collection('users').getOne(reviewer_id);
					reviewer.role = role;
				}
				solution = record;
			}
		});
	}
	function unsubscribe() {
		pb.collection('solutions').unsubscribe(solution.id);
	}
	onMount(subscribe);
	onDestroy(unsubscribe);
</script>

<svelte:head>
	<title>Решение – {solution.author.username} – {problem.title}</title>
</svelte:head>

{#if $screen}
	{#if chat}
		<Chat {chat} {talk} {profile} />
	{:else if solution}
		<Top types={[7]}>Решение</Top>
		<Problem {problem} />
		<Solution {solution} {problem} {profile} />
	{/if}
{:else if solution}
	<Scroll>
		<ToChat {chat} type="7" />
		<Problem {problem} />
		<Solution {solution} {problem} {profile} />
	</Scroll>
	{#if chat}
		<Resize>
			<Chat {chat} {talk} {profile} />
		</Resize>
	{/if}
{/if}
