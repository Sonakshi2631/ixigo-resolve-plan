export type Station = { code: string; city: string; name: string };

export type ClassAvailability = {
  cls: string;
  fare: number;
  /** "AVL-42", "GNWL 45/WL 32", "RAC 12", "REGRET" */
  status: string;
  kind: "available" | "waitlist" | "rac" | "regret";
  seats?: number;
};

export type TrainSchedule = {
  number: string;
  name: string;
  fromCode: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  nextDay: boolean;
  runsOn: string[];
  classes: ClassAvailability[];
};

export const stations: Station[] = [
  { code: "NDLS", city: "New Delhi", name: "New Delhi" },
  { code: "NZM", city: "New Delhi", name: "Hazrat Nizamuddin" },
  { code: "DLI", city: "New Delhi", name: "Old Delhi Junction" },
  { code: "MMCT", city: "Mumbai", name: "Mumbai Central" },
  { code: "BDTS", city: "Mumbai", name: "Bandra Terminus" },
  { code: "CSMT", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj Terminus" },
  { code: "KOTA", city: "Kota", name: "Kota Junction" },
  { code: "ADI", city: "Ahmedabad", name: "Ahmedabad Junction" },
  { code: "JP", city: "Jaipur", name: "Jaipur Junction" },
  { code: "SBC", city: "Bengaluru", name: "KSR Bengaluru" },
];

export const stationByCode = (code: string) => stations.find((s) => s.code === code);

export const stationLabel = (code: string) => {
  const s = stationByCode(code);
  return s ? `${s.name} (${s.code})` : code;
};

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daily = WEEK;

export const trainSchedules: TrainSchedule[] = [
  {
    number: "12951",
    name: "Mumbai Central Rajdhani (King Rajdhani)",
    fromCode: "NDLS",
    toCode: "MMCT",
    departure: "16:55",
    arrival: "08:35",
    duration: "15h 40m",
    nextDay: true,
    runsOn: daily,
    classes: [
      { cls: "3A", fare: 2100, status: "GNWL 45 / WL 32", kind: "waitlist" },
      { cls: "2A", fare: 3055, status: "GNWL 12 / WL 9", kind: "waitlist" },
      { cls: "1A", fare: 5120, status: "AVAILABLE · 3", kind: "available", seats: 3 },
    ],
  },
  {
    number: "12953",
    name: "August Kranti Rajdhani",
    fromCode: "NZM",
    toCode: "BDTS",
    departure: "17:40",
    arrival: "09:55",
    duration: "16h 15m",
    nextDay: true,
    runsOn: daily,
    classes: [
      { cls: "3A", fare: 2150, status: "AVAILABLE · 14", kind: "available", seats: 14 },
      { cls: "2A", fare: 3110, status: "AVAILABLE · 6", kind: "available", seats: 6 },
      { cls: "1A", fare: 5240, status: "RAC 4", kind: "rac" },
    ],
  },
  {
    number: "12137",
    name: "Punjab Mail",
    fromCode: "NDLS",
    toCode: "CSMT",
    departure: "05:20",
    arrival: "09:10",
    duration: "27h 50m",
    nextDay: true,
    runsOn: daily,
    classes: [
      { cls: "SL", fare: 745, status: "GNWL 118 / WL 96", kind: "waitlist" },
      { cls: "3A", fare: 1985, status: "RAC 18", kind: "rac" },
      { cls: "2A", fare: 2870, status: "AVAILABLE · 9", kind: "available", seats: 9 },
    ],
  },
  {
    number: "12910",
    name: "Bandra Terminus Garib Rath",
    fromCode: "NZM",
    toCode: "BDTS",
    departure: "15:35",
    arrival: "10:15",
    duration: "18h 40m",
    nextDay: true,
    runsOn: ["Mon", "Wed", "Fri", "Sat"],
    classes: [
      { cls: "3A", fare: 1310, status: "GNWL 22 / WL 15", kind: "waitlist" },
    ],
  },
  {
    number: "12925",
    name: "Paschim Express",
    fromCode: "NDLS",
    toCode: "BDTS",
    departure: "11:25",
    arrival: "16:40",
    duration: "29h 15m",
    nextDay: true,
    runsOn: daily,
    classes: [
      { cls: "SL", fare: 705, status: "REGRET / WL 214", kind: "regret" },
      { cls: "3A", fare: 1880, status: "GNWL 61 / WL 48", kind: "waitlist" },
      { cls: "2A", fare: 2740, status: "AVAILABLE · 4", kind: "available", seats: 4 },
    ],
  },
  {
    number: "12958",
    name: "Swarna Jayanti Rajdhani",
    fromCode: "NDLS",
    toCode: "ADI",
    departure: "19:55",
    arrival: "09:40",
    duration: "13h 45m",
    nextDay: true,
    runsOn: daily,
    classes: [
      { cls: "3A", fare: 1855, status: "AVAILABLE · 21", kind: "available", seats: 21 },
      { cls: "2A", fare: 2620, status: "AVAILABLE · 11", kind: "available", seats: 11 },
    ],
  },
  {
    number: "12916",
    name: "Ashram Express",
    fromCode: "DLI",
    toCode: "ADI",
    departure: "15:20",
    arrival: "07:35",
    duration: "16h 15m",
    nextDay: true,
    runsOn: daily,
    classes: [
      { cls: "SL", fare: 520, status: "AVAILABLE · 58", kind: "available", seats: 58 },
      { cls: "3A", fare: 1395, status: "GNWL 9 / WL 6", kind: "waitlist" },
    ],
  },
  {
    number: "12958A",
    name: "Jaipur Superfast",
    fromCode: "NDLS",
    toCode: "JP",
    departure: "06:05",
    arrival: "10:45",
    duration: "4h 40m",
    nextDay: false,
    runsOn: daily,
    classes: [
      { cls: "CC", fare: 780, status: "AVAILABLE · 34", kind: "available", seats: 34 },
      { cls: "EC", fare: 1560, status: "AVAILABLE · 12", kind: "available", seats: 12 },
    ],
  },
];

export const weekdayOf = (isoDate: string) => {
  const d = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(d.getTime()) ? "Fri" : WEEK[d.getDay()];
};

export const formatDate = (isoDate: string) => {
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
};

export const searchTrains = ({
  from,
  to,
  date,
  cls,
}: {
  from: string;
  to: string;
  date: string;
  cls?: string;
}) => {
  const day = weekdayOf(date);
  const cityOf = (code: string) => stationByCode(code)?.city ?? code;
  return trainSchedules
    .filter(
      (t) =>
        cityOf(t.fromCode) === cityOf(from) &&
        cityOf(t.toCode) === cityOf(to) &&
        t.runsOn.includes(day) &&
        (!cls || cls === "ALL" || t.classes.some((c) => c.cls === cls)),
    )
    .sort((a, b) => a.departure.localeCompare(b.departure));
};

export const classesOf = (t: TrainSchedule, cls?: string) =>
  !cls || cls === "ALL" ? t.classes : t.classes.filter((c) => c.cls === cls);
