<script>
	import { hosts } from '$lib/state/data';

	export let contact;
	const [domain, id] = contact.split('/');
</script>

<a class="link" href="https://{hosts[domain]}/{id}" target="_blank">{domain}</a>

<style>
	a {
		display: inline;
	}

	a:not(:last-child):after {
		content: ', ';
	}
</style>
