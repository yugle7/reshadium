<script>
	import Text from './Text.svelte';

	export let label;
	export let text;
</script>

{#if text}
	<div class="col">
		<span class="label">{label}</span>
		<Text {text} />
	</div>
{/if}
