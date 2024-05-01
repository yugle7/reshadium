<script>
	import { enhance, applyAction } from '$app/forms';

	import { onMount } from 'svelte';
	import { screen } from '$lib';

	import { copyPaste, pasteToEnd } from '$lib/text/data';

	import { scroll, look, down, reply, edit, text, chat_type } from './data';

	import Reply from './Reply.svelte';

	let input;
	let output;

	export let chat;

	const message = { chat_id: chat.id };
	let disabled;

	$: if ($text != null) input.innerText = $text;

	let inputHeight = 0;

	const send = () => {
		message.reply = $reply;
		message.text = input.innerText;

		if ($edit) {
			message.id = $edit;
			$look = $edit;
			$edit = null;
		} else {
			$down = true;
		}
		$reply = null;
		input.innerText = '';
	};

	const resize = () => {
		if (input && !input.innerText) {
			$scroll = input.scrollHeight - inputHeight;
			inputHeight = input.scrollHeight;
		}
	};
	onMount(() => {
		inputHeight = input.scrollHeight;
		const observer = new ResizeObserver(resize);
		observer.observe(input);
	});
</script>

<form
	method="post"
	action="/messages?/send"
	use:enhance={(cancel) => {
		if (disabled || input.innerText === $text) cancel();
		return applyAction;
	}}
	class="col footer gap-5 padding-10"
	bind:this={output}
>
	<input type="hidden" value={JSON.stringify(message)} name="message" id="message" />

	{#if $reply}
		<div class="row away">
			<Reply message={$reply} />
			<button class="icon" on:click|preventDefault={() => ($reply = null)}>
				<img src="/icons/close.svg" alt="close" class="icon" />
			</button>
		</div>
	{/if}

	<div class="row away">
		<div
			class:placeholder={$screen}
			role="textbox"
			tabindex="0"
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					if (e.ctrlKey || e.altKey || e.metaKey) {
						pasteToEnd('\n');
					} else {
						send();
						setTimeout(() => output.requestSubmit(), 0);
					}
				}
			}}
			on:keyup={() => (disabled = !input.innerText)}
			on:paste|preventDefault={copyPaste}
			contenteditable="true"
			placeholder={chat_type[chat.type]}
			bind:this={input}
		/>
		<button {disabled} class="icon" type="submit" on:click={send}>
			<img src="/icons/send.svg" alt="send" class="icon" />
		</button>
	</div>
</form>
