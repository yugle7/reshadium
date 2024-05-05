<script>
	import { pb, params } from '$lib';
	import { onDestroy, onMount } from 'svelte';

	import ToTalk from '$lib/talk/ToTalk.svelte';
	import { getTime } from '$lib/time/data';

	export let chats;
	export let profile;

	const download = () => {
		chats.sort((a, b) => (a.changed < b.changed) - (a.changed > b.changed));
		chats.forEach((chat) => (chat.changed = getTime(chat.changed)));
		chats = chats;
	};

	async function subscribe() {
		download();

		const talks = {};
		chats.forEach(({ id, talk }) => (talks[id] = talk));

		await pb.collection('talks').subscribe('*', async ({ action, record }) => {
			if (record.profile_id !== profile.id) return;

			if (action === 'update' || action === 'create') {
				const chat = chats.find(({ talk }) => talk.id === record.id);
				if (chat) {
					chat.talk = record;
					chats = chats;
				}
			}
		});
		await pb.collection('chats').subscribe('*', async ({ action, record }) => {
			const talk = talks[record.id];

			if (talk && action === 'update') {
				record.talk = talk;
				record.changed = getTime(record.changed);

				if (record.changed > chats[0].changed) {
					chats = [record, ...chats.filter(({ id }) => id !== record.id)];
				} else {
					const i = chats.findIndex(({ id }) => id === record.id);
					if (i >= 0) chats[i] = record;
				}
			}
		});
	}
	function unsubscribe() {
		pb.collection('chats').unsubscribe('*');
		pb.collection('talks').unsubscribe('*');
	}

	onMount(subscribe);
	onDestroy(unsubscribe);

	$: dst = $params.type == null ? chats : chats.filter(({ type }) => type == $params.type);
</script>

{#if dst.length > 0}
	<ul>
		{#each dst as chat (chat.id + chat.changed)}
			<li class="hover">
				<ToTalk {chat} talk={chat.talk} {profile} />
			</li>
		{/each}
	</ul>
{:else}
	<h2 class="info">Ничего не найдено</h2>
{/if}
