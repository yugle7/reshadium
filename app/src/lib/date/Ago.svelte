<script>
	import { weekdays } from './data';

	export let date;

	const getAgo = (date) => {
		const ago = new Date(date);
		const now = new Date();
		const days = (now.getTime() - ago.getTime()) / 86400000;
		if (days < 1 && ago.getDay() === now.getDay()) return 'Сегодня';
		if (days < 2) return 'Вчера';
		if (days < 7) return weekdays[ago.getDay()];
		return date;
	};
</script>

<span class="font-16 line-1 gray nowrap">{getAgo(date)}</span>
