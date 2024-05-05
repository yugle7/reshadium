<script>
	import { find, look } from './data';
	import { afterUpdate } from 'svelte';

	import Author from '$lib/user/Author.svelte';
	import Ago from '$lib/date/Ago.svelte';
	import Time from '$lib/time/Time.svelte';
	import Text from '$lib/text/Text.svelte';

	export let messages;

	const src = messages
		.filter(({ deleted }) => !deleted)
		.map(({ id, created, text, author }) => ({ id, created, text, author }));

	let dst = [];
	$: if ($find > '') {
		const res = $find ? src.filter(({ text }) => text.toLowerCase().includes($find)) : src;

		let date;
		res.forEach((m) => {
			if (m.created.startsWith(date)) {
				m.date = null;
			} else {
				m.date = date = m.created.substring(0, 11);
			}
		});
		dst = res;
	}

	let output;
	afterUpdate(() =>
		output.scroll({
			top: output.scrollHeight,
			behavior: 'auto'
		})
	);
</script>

<ul bind:this={output} class="col">
	{#each dst as { id, date, author, created, text } (id)}
		{#if date}
			<div class="center line-2">
				<Ago {date} />
			</div>
		{/if}
		<li class="padding-10">
			<button
				class="col text gap-5"
				on:click={() => {
					$find = null;
					$look = id;
				}}
			>
				<div>
					<Author {author} />
					<Time time={created} />
				</div>
				<Text {text} />
			</button>
		</li>
	{/each}
</ul>


