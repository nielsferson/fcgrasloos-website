export const PLAYERS = [
  { id: 1, name: 'Yoran', role: 'Goalkeeper', pos: 'GK', number: '1', x: 50, y: 86, isGK: true },
  { id: 2, name: 'Kobe', role: 'Attacking Left', pos: 'ALA', number: '2', x: 78, y: 62 },
  { id: 3, name: 'Joren', role: 'Fixed', pos: 'FIXO', number: '3', x: 50, y: 62 },
  { id: 4, name: 'Niels', role: 'Attacking Left', pos: 'ALA', number: '4', x: 22, y: 62 },
  { id: 5, name: 'War', role: 'Pivot', pos: 'PIVO', number: '5', x: 78, y: 38 },
  { id: 6, name: 'Liam', role: 'Attacking Left', pos: 'ALA', number: '6', x: 22, y: 38 },
  { id: 7, name: 'Joachim', role: 'Fixed', pos: 'FIXO', number: '7', x: 50, y: 38 },
  { id: 8, name: 'Kobe', role: 'Pivot', pos: 'PIVO', number: '8', x: 50, y: 12 },
];

export function cardSrc(id) {
  return `/images/players/player-${String(id).padStart(2, '0')}.jpg`;
}

export function thumbSrc(id) {
  return `/images/players/player-${String(id).padStart(2, '0')}-thumb.jpg`;
}

export function jerseySrc(player) {
  return player.isGK ? '/images/jerseys/jersey-gk.png' : '/images/jerseys/jersey-outfield.png';
}
