<script>
	import { enhance } from '$app/forms';
	
	import Draft from '$lib/problem/Draft.svelte';

	export let draft;
	export let profile;
	export let problem;

	const { role } = profile;
	const { id, like, editor_id } = draft;
	let { deleted, applied } = draft;
</script>

<div class="col padding-20 scroll gap-10 content-900">
	<Draft {draft} {profile} {problem} />

	<form method="post" action="?/apply" class="top-20" use:enhance>
		<div class="row wrap center gap-15 right bottom-20">
			{#if deleted}
				<span class="label">Удалено</span>
			{:else if applied}
				<span class="label">Применено</span>
			{/if}

			<button
				class="button"
				class:hidden={!deleted}
				formaction="?/restore"
				on:click={() => (deleted = null)}
			>
				Вернуть
			</button>
			<button
				class="button"
				class:hidden={!applied}
				formaction="?/cancel"
				on:click={() => (applied = null)}
			>
				Вернуть
			</button>

			{#if role >= 3}
				<button
					class="link"
					class:hidden={deleted || applied}
					formaction="?/delete"
					on:click={() => (deleted = new Date())}
				>
					Удалить
				</button>
			{/if}

			{#if profile.id === editor_id || role >= 3}
				<a class="link" class:hidden={deleted || applied} href="/drafts/{id}/update">Обновить</a>
			{/if}

			{#if like > 80 || role >= 3}
				<button
					class="button"
					type="submit"
					class:hidden={deleted || applied}
					on:click={() => (applied = new Date())}
				>
					Применить
				</button>
			{/if}
		</div>
	</form>
</div>
