<script>
	import { weekdays } from './data';

	export let time;

	const getAgo = (time) => {
		const ago = new Date(time);
		const now = new Date();

		const days = (now.getTime() - ago.getTime()) / 86400000;

		if (days < 1 && ago.getDay() === now.getDay()) return time.substring(11, 16);
		if (days < 2) return 'Вчера';
		if (days < 7) return weekdays[ago.getDay()];
		return time.substring(8, 10) + '.' + time.substring(5, 7) + '.' + time.substring(2, 4);
	};
</script>

<span class="font-16 line-1 gray nowrap">{getAgo(time)}</span>
