import { useState } from 'react';
import PageIntro from '../components/PageIntro';
import { PLAYERS, cardSrc, jerseySrc } from '../data/players';
import '../styles/team.css';

export default function Team() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = PLAYERS.find((p) => p.id === selectedId);

  return (
    <>
      <PageIntro
        eyebrow="OUR SQUAD"
        title="Meet the Team"
        subtitle="Click a player's jersey to reveal the player card."
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
                  aria-label={`${p.name}, ${p.role}`}
                >
                  <span className="pitch-player__jersey">
                    <img src={jerseySrc(p)} alt="" />
                    <span className="pitch-player__number">{p.number}</span>
                  </span>
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

            <div className="roster-panel__card">
              <div className="roster-panel__card-media">
                <img
                  src={cardSrc(selectedId)}
                  alt={`${selected.name} (${selected.pos}) player card`}
                  key={selectedId}
                />
              </div>
              <div className="roster-panel__card-info">
                <p className="roster-panel__card-pos">{selected.pos}</p>
                <h2 className="roster-panel__card-name">{selected.name}</h2>
                <p className="roster-panel__card-role">{selected.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
