import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import PageIntro from '../components/PageIntro';
import '../styles/team.css';

const PLAYERS = [
  { id: 1, name: 'Player 1', role: 'Goalkeeper', pos: 'GK', number: '1', x: 50, y: 86, isGK: true },
  { id: 2, name: 'Player 2', role: 'Attacking Left', pos: 'ALA', number: '2', x: 78, y: 62 },
  { id: 3, name: 'Player 3', role: 'Fixed', pos: 'FIXO', number: '3', x: 50, y: 62 },
  { id: 4, name: 'Player 4', role: 'Attacking Left', pos: 'ALA', number: '4', x: 22, y: 62 },
  { id: 5, name: 'Player 5', role: 'Pivot', pos: 'PIVO', number: '5', x: 78, y: 38 },
  { id: 6, name: 'Player 6', role: 'Attacking Left', pos: 'ALA', number: '6', x: 22, y: 38 },
  { id: 7, name: 'Player 7', role: 'Fixed', pos: 'FIXO', number: '7', x: 50, y: 38 },
  { id: 8, name: 'Player 8', role: 'Pivot', pos: 'PIVO', number: '8', x: 50, y: 12 },
];

function cardSrc(id) {
  return `/images/players/player-${String(id).padStart(2, '0')}.jpg`;
}

function thumbSrc(id) {
  return `/images/players/player-${String(id).padStart(2, '0')}-thumb.jpg`;
}

export default function Team() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = PLAYERS.find((p) => p.id === selectedId);

  return (
    <>
      <PageIntro
        eyebrow="OUR SQUAD"
        title="Meet the Team"
        subtitle="Click a player name to reveal the player card."
        scriptLines={['More than', 'a team']}
      />

      <section className="team-board">
        <div className="container team-board__grid">
          <div className="panel pitch-panel">
            <div className="panel__header">
              <p className="panel__title">
                <span className="panel__title-rule" />
                FC Grasloos<span className="panel__title-sub">Team formation</span>
              </p>
              <p className="panel__caption">TOGETHER<br />WE PLAY FURTHER</p>
            </div>

            <div className="pitch">
              <svg className="pitch__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <rect x="3" y="3" width="94" height="94" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <line x1="3" y1="50" x2="97" y2="50" stroke="currentColor" strokeWidth="0.4" />
                <rect x="26" y="3" width="48" height="16" fill="none" stroke="currentColor" strokeWidth="0.4" />
                <rect x="26" y="81" width="48" height="16" fill="none" stroke="currentColor" strokeWidth="0.4" />
              </svg>

              {PLAYERS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={
                    'pitch-player' +
                    (p.id === selectedId ? ' pitch-player--active' : '') +
                    (p.isGK ? ' pitch-player--gk' : '')
                  }
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onClick={() => setSelectedId(p.id)}
                  aria-pressed={p.id === selectedId}
                >
                  <span className="pitch-player__jersey">{p.number}</span>
                  <span className="pitch-player__label">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="panel__footer">
              <span>Small pitch<br />Big dreams</span>
              <span>FC Grasloos<br />Est. 2015</span>
            </div>
          </div>

          <div className="panel roster-panel">
            <div className="panel__header">
              <p className="panel__title">
                <span className="panel__title-rule" />
                Player card
              </p>
              <p className="panel__caption panel__caption--single">FC GRASLOOS</p>
            </div>

            <div className="roster-panel__body">
              <div className="roster-panel__card">
                <img
                  src={cardSrc(selectedId)}
                  alt={`${selected.name} (${selected.pos}) player card`}
                  key={selectedId}
                />
              </div>

              <ul className="roster-list">
                {PLAYERS.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={
                        'roster-list__row' + (p.id === selectedId ? ' roster-list__row--active' : '')
                      }
                      onClick={() => setSelectedId(p.id)}
                      aria-pressed={p.id === selectedId}
                    >
                      <img src={thumbSrc(p.id)} alt="" className="roster-list__thumb" />
                      <span className="roster-list__text">
                        <span className="roster-list__name">{p.name}</span>
                        <span className="roster-list__role">
                          {p.role} ({p.pos})
                        </span>
                      </span>
                      <ChevronRight size={18} className="roster-list__chevron" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
