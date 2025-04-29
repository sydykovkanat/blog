import { format, formatDistanceToNow, FormatOptions, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export function date(
	date: string | Date,
	template: string = 'PPP',
	options: FormatOptions = {},
) {
	return format(date, template, {
		locale: ru,
		...options,
	});
}

export function timeAgo(date: string | Date): string {
	const parsedDate = typeof date === 'string' ? parseISO(date) : date;
	const distance = formatDistanceToNow(parsedDate, { locale: ru });

	return distance;
}
