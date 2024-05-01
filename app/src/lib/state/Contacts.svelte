<script>
	import { params, errors } from '$lib';
	import { checkContacts, normContacts } from './data';
	import { copyPaste } from '$lib/text/data';

	let contacts = $params.contacts;
</script>

<div class="col">
	<input type="hidden" bind:value={$params.contacts} id="contacts" name="contacts" />

	<span class="input">
		<div
			class="placeholder"
			role="textbox"
			name="contacts"
			tabindex="0"
			contenteditable="true"
			on:keydown={() => delete $errors.contacts}
			on:paste|preventDefault={copyPaste}
			placeholder="Соцсети"
			bind:innerText={contacts}
			type="text"
			on:blur={() => {
				if (contacts !== '') {
					$errors.contacts = checkContacts(contacts);
					if (!$errors.contacts) $params.contacts = contacts = normContacts(contacts);
				}
			}}
		/>
	</span>

	{#if $errors.contacts}
		<span class="failed">{$errors.contacts}</span>
	{/if}
</div>
