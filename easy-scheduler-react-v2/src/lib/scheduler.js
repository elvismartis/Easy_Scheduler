
export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const DEFAULT_CONFIG = {
  activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  start: '08:30',
  end: '17:30',
  interval: 60
};

// Validate and convert HH:MM into minutes after midnight.
export const minutes = (t) => {
  if (typeof t !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(t)) {
    throw new Error(`Invalid time: ${t}`);
  }

  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

// Convert minutes after midnight into HH:MM.
export const time = (m) => {
  if (!Number.isInteger(m) || m < 0 || m >= 1440) {
    throw new Error(`Invalid minute value: ${m}`);
  }

  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

// Convert HH:MM into 12-hour display format.
export const display = (t) => {
  const total = minutes(t);
  const h = Math.floor(total / 60);
  const m = total % 60;

  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

// Generate timetable slots.
export const slotsFor = (config) => {
  const start = minutes(config.start);
  const end = minutes(config.end);
  const step = Number(config.interval);

  if (!Number.isInteger(step) || step <= 0) {
    throw new Error('Slot interval must be a positive integer.');
  }

  if (end <= start) {
    throw new Error('End time must be later than start time.');
  }

  const slots = [];

  for (let current = start; current < end; current += step) {
    const slotEnd = Math.min(current + step, end);

    slots.push({
      start: time(current),
      end: time(slotEnd),
      from: current,
      to: slotEnd
    });
  }

  return slots;
};

// Identify overlapping activities.
export const conflictsFor = (activities, activity, ignoreId) => {
  const start = minutes(activity.start);
  const end = minutes(activity.end);

  if (end <= start) {
    throw new Error('Activity end time must be later than start time.');
  }

  if (!Array.isArray(activity.days) || activity.days.length === 0) {
    throw new Error('At least one activity day is required.');
  }

  return activities
    .filter(existing =>
      existing.id !== ignoreId &&
      activity.days.includes(existing.day) &&
      start < minutes(existing.end) &&
      end > minutes(existing.start)
    )
    .map(existing => ({
      ...existing,
      overlapStart: time(Math.max(start, minutes(existing.start))),
      overlapEnd: time(Math.min(end, minutes(existing.end)))
    }));
};

// Generate unique IDs.
export const uid = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};
