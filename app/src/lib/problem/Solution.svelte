<script>
	import { params } from '$lib';
	import { enhance } from '$app/forms';

	import { solution_progress } from '$lib/solution/data';

	import Text from '$lib/state/Text.svelte';
	import Label from '$lib/text/Label.svelte';

	export let solution;
	export let profile;

	let { answer, proof, progress } = solution || {};
	$params = { answer, proof };

	let edit = !progress;
	
	export let form;
	$: if (form?.progress) progress = form.progress;

	$: equal = $params.answer === answer && $params.proof === proof;
	$: empty = !$params.answer && !$params.proof;
</script>

{#if profile}
	<div class="highlighted">
		<form method="post" action="?/progress" class="padding-20 content-900" use:enhance>
			<input type="hidden" bind:value={progress} name="progress" id="progress" />

			<div class:hidden={!edit} class="col gap-10">
				<Text key="answer" title="Ответ" />
				<Text key="proof" title="Доказательство" />

				<div class="row gap-15 right">
					<button
						class:hidden={empty || (equal && progress === 1)}
						class="link"
						type="submit"
						on:click={() => {
							progress = 1;
							answer = $params.answer;
							proof = $params.proof;
							edit = false;
						}}
					>
						<span class="shy">Сохранить</span>
					</button>

					{#if progress > 0}
						<button
							class="link"
							on:click|preventDefault|stopPropagation={() => {
								$params = { answer, proof };
								edit = false;
							}}
						>
							Отменить
						</button>
					{/if}

					<button
						disabled={edit && (empty || (equal && progress === 2))}
						class="button"
						on:click={() => {
							progress = 2;
							answer = $params.answer;
							proof = $params.proof;
							edit = false;
						}}
						type="submit"
					>
						{#if progress > 0}
							Отправить
						{:else}
							Решить
						{/if}
					</button>
				</div>
			</div>

			<div class:hidden={edit} class="col gap-10">
				<Label text={answer} label="Ответ" />
				<Label text={proof} label="Доказательство" />

				<div class="row gap-15 center right">
					<span class="label">{solution_progress[progress]}</span>

					<button
						class:hidden={progress !== 5}
						class="button"
						type="submit"
						on:click={() => (progress = 1)}
					>
						Отменить
					</button>
					{#if progress !== 5}
						<button
							class="button"
							on:click|preventDefault|stopPropagation={() => {
								$params = { answer, proof };
								edit = true;
							}}
						>
							Исправить
						</button>
					{/if}
				</div>
			</div>
		</form>
	</div>
{:else}
	<div class="padding-20 content-900">
		<a class="button right" href="/login">Решить</a>
	</div>
{/if}
