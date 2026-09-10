export const FIXTURES = [
  { iso: '2026-09-10', date: 'Thu 10 Sep 2026', time: '22:00', opponent: 'Zvc Oudleiding Chiro Opglabbeek', home: false, venue: 'Sportcomplex Opglabbeek', month: 'September 2026' },
  { iso: '2026-09-24', date: 'Thu 24 Sep 2026', time: '22:00', opponent: 'ZVC Paris nog niet misschien', home: true, venue: 'Sportcomplex Opglabbeek', month: 'September 2026' },
  { iso: '2026-10-01', date: 'Thu 01 Oct 2026', time: '22:00', opponent: 'Zvc Klinkerke', home: false, venue: 'Sportcomplex Opglabbeek', month: 'October 2026' },
  { iso: '2026-10-15', date: 'Thu 15 Oct 2026', time: '22:00', opponent: 'ZVC Planché', home: true, venue: 'Sportcomplex Opglabbeek', month: 'October 2026' },
  { iso: '2026-10-22', date: 'Thu 22 Oct 2026', time: '22:00', opponent: 'ZVC Galatassaroy', home: true, venue: 'Sportcomplex Opglabbeek', month: 'October 2026' },
  { iso: '2026-11-12', date: 'Thu 12 Nov 2026', time: '22:00', opponent: 'Zvk Luttelmeeuwen', home: false, venue: 'Sportcomplex Opglabbeek', month: 'November 2026' },
  { iso: '2026-12-10', date: 'Thu 10 Dec 2026', time: '22:00', opponent: 'ZVK De Jeugd', home: true, venue: 'Sportcomplex Opglabbeek', month: 'December 2026' },
  { iso: '2026-12-23', date: 'Wed 23 Dec 2026', time: '21:30', opponent: 'Zvk De Mans', home: false, venue: 'Sportcentrum Meeuwen', month: 'December 2026' },
  { iso: '2027-01-07', date: 'Thu 07 Jan 2027', time: '22:00', opponent: 'ZVC Klinkerke', home: true, venue: 'Sportcomplex Opglabbeek', month: 'January 2027' },
  { iso: '2027-01-13', date: 'Wed 13 Jan 2027', time: '21:30', opponent: 'ZVK Real', home: true, venue: 'Sportcentrum Meeuwen', month: 'January 2027' },
  { iso: '2027-01-20', date: 'Wed 20 Jan 2027', time: '21:30', opponent: 'Zvc Galatassaroy', home: false, venue: 'Sportcomplex Opglabbeek', month: 'January 2027' },
  { iso: '2027-02-11', date: 'Thu 11 Feb 2027', time: '22:00', opponent: 'ZVC Bankenboys', home: true, venue: 'Sportcomplex Opglabbeek', month: 'February 2027' },
  { iso: '2027-03-04', date: 'Thu 04 Mar 2027', time: '22:00', opponent: 'Zvc Ambriage', home: false, venue: 'Sportcomplex Opglabbeek', month: 'March 2027' },
  { iso: '2027-03-24', date: 'Wed 24 Mar 2027', time: '21:30', opponent: 'ZVC Pinanti', home: true, venue: 'Sportcomplex Opglabbeek', month: 'March 2027' },
  { iso: '2027-04-08', date: 'Thu 08 Apr 2027', time: '22:00', opponent: 'Zvc Marseille Oudsbergen', home: false, venue: 'Sportcomplex Opglabbeek', month: 'April 2027' },
  { iso: '2027-04-22', date: 'Thu 22 Apr 2027', time: '22:00', opponent: 'ZVC Planché', home: false, venue: 'Sportcomplex Opglabbeek', month: 'April 2027' },
  { iso: '2027-04-29', date: 'Thu 29 Apr 2027', time: '22:00', opponent: 'Zvc Oudleiding Chiro Opglabbeek', home: false, venue: 'Sportcomplex Opglabbeek', month: 'April 2027' },
  { iso: '2027-05-05', date: 'Wed 05 May 2027', time: '21:30', opponent: 'ZVC Bankenboys', home: true, venue: 'Sportcomplex Opglabbeek', month: 'May 2027' },
  { iso: '2027-05-27', date: 'Thu 27 May 2027', time: '22:00', opponent: 'ZVK Meubelen Geusens', home: true, venue: 'Sportcomplex Opglabbeek', month: 'May 2027' },
  { iso: '2027-06-17', date: 'Thu 17 Jun 2027', time: '22:00', opponent: 'ZVC Paris nog niet misschien', home: false, venue: 'Sportcomplex Opglabbeek', month: 'June 2027' },
];

export function fixtureKey(fixture) {
  return `${fixture.iso}|${fixture.opponent}`;
}

// Parses a "YYYY-MM-DD" fixture date as local midnight, so it compares
// consistently with `new Date()` regardless of the visitor's timezone
// (a plain `new Date(iso)` would parse it as UTC midnight instead, which
// can be a different calendar day from "today" for non-UTC visitors).
export function parseIsoDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function isPastFixture(iso) {
  return parseIsoDate(iso) < startOfToday();
}

export function getNextMatch() {
  const today = startOfToday();
  const upcoming = FIXTURES.find((f) => parseIsoDate(f.iso) >= today);
  return upcoming || FIXTURES[FIXTURES.length - 1];
}

const VENUE_ADDRESSES = {
  'Sportcomplex Opglabbeek': 'Kruisstraat 7, 3660 Oudsbergen',
  'Sportcentrum Meeuwen': 'Kerkplein 1, 3670 Oudsbergen',
};

export function venueAddress(venue) {
  return VENUE_ADDRESSES[venue] || venue;
}

export function venueMapUrl(venue) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress(venue))}`;
}
