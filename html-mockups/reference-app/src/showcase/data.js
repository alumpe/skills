/** Sample records shared by the sections of the patterns page. */

export const EMPLOYEES = [
  {
    id: "anna",
    name: "Anna Müller",
    area: "Service",
    hours: 38,
    status: "Eingeplant",
    variant: "primary",
  },
  {
    id: "ben",
    name: "Ben Schmidt",
    area: "Küche",
    hours: 24,
    status: "Urlaub",
    variant: "warning",
  },
  {
    id: "carla",
    name: "Carla Weber",
    area: "Service",
    hours: 32,
    status: "Eingeplant",
    variant: "primary",
  },
  {
    id: "david",
    name: "David Koch",
    area: "Bar",
    hours: 20,
    status: "Krank",
    variant: "danger",
  },
  {
    id: "elif",
    name: "Elif Yıldız",
    area: "Küche",
    hours: 40,
    status: "Entwurf",
    variant: "neutral",
  },
];

export const AREAS = ["Service", "Küche", "Bar"];

export const STATUSES = ["Eingeplant", "Urlaub", "Krank", "Entwurf"];

export const SHIFTS = [
  {
    key: "early",
    name: "Frühschicht",
    area: "Service",
    time: "06:00 – 14:30",
    staffed: "4 / 4",
    status: "success",
  },
  {
    key: "mid",
    name: "Mittelschicht",
    area: "Küche",
    time: "11:00 – 19:30",
    staffed: "2 / 3",
    status: "warning",
  },
  {
    key: "late",
    name: "Spätschicht",
    area: "Bar",
    time: "17:00 – 01:00",
    staffed: "0 / 2",
    status: "error",
  },
];

export const HOURS_PER_DAY = [
  { label: "Mo", value: 62 },
  { label: "Di", value: 58 },
  { label: "Mi", value: 71 },
  { label: "Do", value: 66 },
  { label: "Fr", value: 94 },
  { label: "Sa", value: 108 },
  { label: "So", value: 83 },
];

export const REVENUE_PER_WEEK = [
  { week: "42", plan: 18.2, actual: 17.4 },
  { week: "43", plan: 18.6, actual: 19.1 },
  { week: "44", plan: 19.0, actual: 18.3 },
  { week: "45", plan: 19.4, actual: 20.6 },
  { week: "46", plan: 19.8, actual: 21.2 },
];

export const HOURS_PER_AREA = [
  { label: "Service", value: 286 },
  { label: "Küche", value: 172 },
  { label: "Bar", value: 84 },
];
