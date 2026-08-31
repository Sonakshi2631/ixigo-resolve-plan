export type Certainty = "guaranteed" | "protected";

export type AlternativeLeg = {
  mode: "train" | "bus" | "plane";
  title: string;
  detail: string;
  status: string;
};

export type Alternative = {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  legs: AlternativeLeg[];
  tradeoffs: { label: string; tone: "success" | "info" | "caution" }[];
  price: number;
  extraFee?: { label: string; amount: number };
  cta: string;
  certainty: Certainty;
  certaintyScore: number;
  arrival: string;
  arrivalMinutes: number;
  valueNote: string;
};

export const journey = {
  fromCity: "New Delhi",
  fromCode: "NDLS",
  toCity: "Mumbai Central",
  toCode: "MMCT",
  date: "Fri, 18 Sep",
  travellers: "1 Traveller",
  quota: "General",
};

export const preferredTrain = {
  number: "12951",
  name: "King Rajdhani Express",
  departure: "16:55",
  arrival: "08:35",
  duration: "15h 40m",
  cls: "3A (3rd AC)",
  status: "GNWL 45 / WL 32",
  fare: 2100,
  chance: 42,
};

export const alternatives: Alternative[] = [
  {
    id: "nearby-station",
    kind: "Nearby Station Switch",
    title: "August Kranti Rajdhani",
    subtitle: "Hazrat Nizamuddin (NZM) ➔ Bandra Terminus (BDTS)",
    legs: [
      {
        mode: "train",
        title: "12953 · August Kranti Rajdhani",
        detail: "NZM 17:40 ➔ BDTS 09:55 · 3A",
        status: "AVAILABLE · 14 Seats",
      },
    ],
    tradeoffs: [
      { label: "+15 mins extra travel to station", tone: "caution" },
      { label: "100% Guaranteed Seat", tone: "success" },
    ],
    price: 2150,
    cta: "Book Confirmed Train",
    certainty: "guaranteed",
    certaintyScore: 100,
    arrival: "09:55",
    arrivalMinutes: 9 * 60 + 55,
    valueNote: "Same comfort, confirmed berth today",
  },
  {
    id: "smart-split",
    kind: "Smart Split Journey",
    title: "Train + AC Sleeper Bus",
    subtitle: "New Delhi (NDLS) ➔ Kota ➔ Mumbai",
    legs: [
      {
        mode: "train",
        title: "Leg 1 · 12958 Rajdhani",
        detail: "NDLS 19:55 ➔ Kota 00:35 · 3A",
        status: "CONFIRMED",
      },
      {
        mode: "bus",
        title: "Leg 2 · AbhiBus AC Sleeper",
        detail: "Kota 01:30 ➔ Mumbai 10:05",
        status: "SEATS OPEN",
      },
    ],
    tradeoffs: [
      { label: "Arrives 1.5 hrs later", tone: "caution" },
      { label: "100% Guaranteed Journey", tone: "success" },
      { label: "Seamless Single Booking", tone: "info" },
    ],
    price: 2450,
    cta: "Book Smart Combo",
    certainty: "guaranteed",
    certaintyScore: 100,
    arrival: "10:05",
    arrivalMinutes: 10 * 60 + 5,
    valueNote: "One booking, one support desk, both legs",
  },
  {
    id: "protected-waitlist",
    kind: "Protected Waitlist",
    title: "King Rajdhani + Auto-Flight Backup",
    subtitle: "Keep WL 45 with ixigo Assured fallback",
    legs: [
      {
        mode: "train",
        title: "12951 · King Rajdhani Express",
        detail: "NDLS 16:55 ➔ MMCT 08:35 · 3A",
        status: "GNWL 45 / WL 32",
      },
      {
        mode: "plane",
        title: "Backup · ixigo Flights reserve",
        detail: "Auto-triggered 24h before departure",
        status: "80% FLIGHT VOUCHER",
      },
    ],
    tradeoffs: [
      { label: "Keeps your preferred train", tone: "info" },
      { label: "42% confirmation chance", tone: "caution" },
      { label: "Flight fallback if not confirmed", tone: "success" },
    ],
    price: 2100,
    extraFee: { label: "Seat Protection Fee", amount: 149 },
    cta: "Book Waitlist with Seat Protection",
    certainty: "protected",
    certaintyScore: 42,
    arrival: "08:35",
    arrivalMinutes: 8 * 60 + 35,
    valueNote: "If the train isn't confirmed 24h before departure, you get an instant flat 80% flight voucher discount automatically.",
  },
];

export const HONESTY_NOTE =
  "Predictions are based on historical IRCTC trends and seasonal demand. They are not absolute guarantees.";

export const totalOf = (alt: Alternative) => alt.price + (alt.extraFee?.amount ?? 0);

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
