<script>
	import { parse } from '$lib/text/data';

	import Secret from './Secret.svelte';

	export let text;
</script>

<div class="col">
	{#each parse(text) as result}
		{#if result == null}
			<span style="height: 1em"></span>
		{:else if typeof result === 'string'}
			<p class="code font-20">{result}</p>
		{:else}
			<p>
				{#each result as r}
					{#if typeof r === 'string'}
						<span>{r}</span>
					{:else if r.length === 1}
						<span class="code font-20">{r[0]}</span>
					{:else if r[0] === '@'}
						<a class="link" href="/users/{r[1]}">{r[1]}</a>
					{:else if typeof r[0] === 'string'}
						<a class="link" href={r[0]} target="_blank">{r[1]}</a>
					{:else}
						<Secret title={r[1]} result={r[0]} />
					{/if}
				{/each}
			</p>
		{/if}
	{/each}
</div>
