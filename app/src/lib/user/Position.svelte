<script>
	export let position;

	const fontSize = 23 - 3 * ((position >= 10) + (position >= 100) + (position >= 1000));
	const style = `font-size: ${fontSize}px;`;

	if (position >= 1000000) position = Math.floor(position / 1000000) + 'M';
	else if (position >= 10000) position = Math.floor(position / 1000) + 'K';
</script>

<span {style} class="monospace">{position == null ? '-' : position || '+'}</span>

<style>
	span {
		display: inline-block;
		text-align: center;
		width: 35px;
	}
</style>
