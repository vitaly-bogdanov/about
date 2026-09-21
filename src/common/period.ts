const monthFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatPeriod(
  startDate: Date,
  endDate: Date | null | undefined,
): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : 'настоящее время';

  return capitalize(`${start} — ${end}`);
}

function formatMonthYear(date: Date): string {
  return monthFormatter.format(date).replace(/\s*г\.\s*$/u, '');
}

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase('ru-RU') + value.slice(1);
}
