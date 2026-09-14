import { businessInfo } from '../data/businessInfo';

const SOON_THRESHOLD_MINUTES = 60;
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/** A büfé időzónája szerinti nap és időpont, a látogató helyétől függetlenül. */
const getLocalTime = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const read = (type) => parts.find((part) => part.type === type).value;

  return {
    day: WEEKDAY_INDEX[read('weekday')],
    minutes: Number(read('hour')) * 60 + Number(read('minute')),
  };
};

const findNextOpening = (hours, fromDay) => {
  for (let offset = 1; offset <= 7; offset += 1) {
    const entry = hours.find((candidate) => candidate.day === (fromDay + offset) % 7);
    if (entry?.open) return { entry, isTomorrow: offset === 1 };
  }
  return null;
};

/**
 * @returns {{ state: 'open' | 'soon' | 'closed', label: string, detail: string, today: number }}
 */
export const getOpeningStatus = (date = new Date()) => {
  const { openingHours: hours, timeZone } = businessInfo;
  const { day, minutes } = getLocalTime(date, timeZone);
  const todayEntry = hours.find((entry) => entry.day === day);

  if (todayEntry?.open) {
    const openAt = toMinutes(todayEntry.open);
    const closeAt = toMinutes(todayEntry.close);

    if (minutes >= openAt && minutes < closeAt) {
      return { state: 'open', label: 'Most nyitva', detail: `Ma ${todayEntry.close}-ig`, today: day };
    }
    if (minutes < openAt) {
      const isSoon = openAt - minutes <= SOON_THRESHOLD_MINUTES;
      return {
        state: isSoon ? 'soon' : 'closed',
        label: isSoon ? 'Hamarosan nyitunk' : 'Most zárva',
        detail: `Ma ${todayEntry.open}-kor nyitunk`,
        today: day,
      };
    }
  }

  const next = findNextOpening(hours, day);
  const detail = next
    ? `Nyitás: ${next.isTomorrow ? 'holnap' : next.entry.label.toLowerCase()} ${next.entry.open}`
    : '';

  return { state: 'closed', label: 'Most zárva', detail, today: day };
};
