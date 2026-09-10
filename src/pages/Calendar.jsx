import { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, Pencil, Check, X } from 'lucide-react';
import PageIntro from '../components/PageIntro';
import PitchCard from '../components/PitchCard';
import { FIXTURES, getNextMatch, venueMapUrl, fixtureKey, parseIsoDate, isPastFixture } from '../data/fixtures';
import { useAuth } from '../context/AuthContext';
import { scoresEnabled, fetchScores, saveScore } from '../lib/scoresApi';
import '../styles/calendar.css';

function groupByYear(fixtures) {
  const years = new Map();
  fixtures.forEach((f) => {
    const year = f.iso.slice(0, 4);
    if (!years.has(year)) years.set(year, []);
    years.get(year).push(f);
  });
  return Array.from(years, ([year, matches]) => ({ year, matches }));
}

function groupByMonth(matches) {
  const months = new Map();
  matches.forEach((m) => {
    if (!months.has(m.month)) months.set(m.month, []);
    months.get(m.month).push(m);
  });
  return Array.from(months, ([month, monthMatches]) => ({ month, matches: monthMatches }));
}

function dateBadge(iso) {
  const d = parseIsoDate(iso);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
  };
}

function ScoreEditor({ initial, onCancel, onSubmit }) {
  const [home, setHome] = useState(initial?.home ?? '');
  const [away, setAway] = useState(initial?.away ?? '');
  const [saving, setSaving] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (home === '' || away === '') return;
    setSaving(true);
    onSubmit(Number(home), Number(away)).finally(() => setSaving(false));
  }

  return (
    <form className="score-editor" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
      <input
        type="number"
        min="0"
        max="99"
        value={home}
        onChange={(e) => setHome(e.target.value)}
        aria-label="Home score"
        autoFocus
      />
      <span>–</span>
      <input
        type="number"
        min="0"
        max="99"
        value={away}
        onChange={(e) => setAway(e.target.value)}
        aria-label="Away score"
      />
      <button type="submit" className="score-editor__btn score-editor__btn--save" disabled={saving} aria-label="Save score">
        <Check size={14} />
      </button>
      <button type="button" className="score-editor__btn" onClick={onCancel} aria-label="Cancel">
        <X size={14} />
      </button>
    </form>
  );
}

function YearPanel({ year, matches, nextMatch, scores, isAuthed, editingKey, setEditingKey, onSaveScore }) {
  const playedCount = matches.filter((m) => isPastFixture(m.iso)).length;

  return (
    <div className="panel year-panel">
      <div className="year-panel__header">
        <span className="year-panel__year">{year}</span>
        <span className="year-panel__count">
          {matches.length} fixture{matches.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="year-panel__progress">
        <div
          className="year-panel__progress-bar"
          style={{ width: `${matches.length ? (playedCount / matches.length) * 100 : 0}%` }}
        />
      </div>

      {groupByMonth(matches).map((group) => (
        <div className="year-month" key={group.month}>
          <p className="year-month__label">{group.month.split(' ')[0].toUpperCase()}</p>
          {group.matches.map((m) => {
            const badge = dateBadge(m.iso);
            const isNext = m.iso === nextMatch.iso && m.opponent === nextMatch.opponent;
            const key = fixtureKey(m);
            const score = scores[key];
            const isEditing = editingKey === key;

            return (
              <div
                key={key}
                className={
                  'fixture-item' +
                  (isNext ? ' fixture-item--next' : '') +
                  (isPastFixture(m.iso) ? ' fixture-item--past' : '')
                }
              >
                <div className="fixture-item__date">
                  <span className="fixture-item__day">{badge.day}</span>
                  <span className="fixture-item__month">{badge.month}</span>
                </div>
                <div className="fixture-item__main">
                  <p className="fixture-item__opponent">{m.opponent}</p>
                  <p className="fixture-item__meta">
                    <span>{m.time}</span>
                    <span>&bull;</span>
                    <a
                      href={venueMapUrl(m.venue)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="venue-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {m.venue}
                    </a>
                  </p>
                </div>

                {isEditing ? (
                  <ScoreEditor
                    initial={score}
                    onCancel={() => setEditingKey(null)}
                    onSubmit={(home, away) => onSaveScore(key, home, away)}
                  />
                ) : (
                  <div className="fixture-item__trailing">
                    {score && (
                      <span className="fixture-item__score">
                        {score.home}&ndash;{score.away}
                      </span>
                    )}
                    <span className={'fixture-badge' + (m.home ? ' fixture-badge--home' : ' fixture-badge--away')}>
                      {m.home ? 'HOME' : 'AWAY'}
                    </span>
                    {isAuthed && (
                      <button
                        type="button"
                        className="fixture-item__edit"
                        onClick={() => setEditingKey(key)}
                        aria-label={`Edit score for ${m.opponent}`}
                      >
                        <Pencil size={13} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Calendar() {
  const nextMatch = getNextMatch();
  const years = groupByYear(FIXTURES);
  const { token, isAuthed } = useAuth();

  const [scores, setScores] = useState({});
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    if (!scoresEnabled) return;
    fetchScores().then(setScores).catch(() => {});
  }, []);

  async function handleSaveScore(key, home, away) {
    const updated = await saveScore(token, key, home, away);
    setScores(updated);
    setEditingKey(null);
  }

  const nextMatchScore = scores[fixtureKey(nextMatch)];

  return (
    <>
      <PageIntro
        eyebrow="SEASON 2026 – 2027"
        title="Match Calendar"
        subtitle="All fixtures for the 2026 – 2027 season"
        scriptLines={['Same team', 'higher goals']}
      />

      <section className="cal-board">
        <div className="container cal-board__grid">
          <div className="year-columns">
            {years.map(({ year, matches }) => (
              <YearPanel
                key={year}
                year={year}
                matches={matches}
                nextMatch={nextMatch}
                scores={scores}
                isAuthed={isAuthed}
                editingKey={editingKey}
                setEditingKey={setEditingKey}
                onSaveScore={handleSaveScore}
              />
            ))}
          </div>

          <div className="cal-sidebar">
            <div className="next-match">
              <div className="next-match__header">
                <p className="next-match__eyebrow">
                  <span className="next-match__eyebrow-rule" />
                  NEXT MATCH
                </p>
                <span className="next-match__header-right">
                  {nextMatchScore && (
                    <span className="fixture-item__score fixture-item__score--light">
                      {nextMatchScore.home}&ndash;{nextMatchScore.away}
                    </span>
                  )}
                  <span className={'fixture-badge' + (nextMatch.home ? ' fixture-badge--home' : ' fixture-badge--away') + ' next-match__badge'}>
                    {nextMatch.home ? 'HOME' : 'AWAY'}
                  </span>
                </span>
              </div>

              <div className="next-match__teams">
                <div className="next-match__team">
                  <div className="next-match__crest">
                    <img src="/images/logo.png" alt="FC Grasloos crest" />
                  </div>
                  <span>FC GRASLOOS</span>
                </div>

                <span className="next-match__vs">VS</span>

                <div className="next-match__team">
                  <div className="next-match__crest next-match__crest--tba">?</div>
                  <span>{nextMatch.opponent}</span>
                </div>
              </div>

              <div className="next-match__details">
                <div className="next-match__detail">
                  <CalendarIcon size={16} />
                  <span>
                    {nextMatch.date.toUpperCase()}
                    <br />
                    {nextMatch.time}
                  </span>
                </div>
                <a
                  href={venueMapUrl(nextMatch.venue)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="next-match__detail next-match__detail--right venue-link"
                >
                  <MapPin size={16} />
                  <span>{nextMatch.venue}</span>
                </a>
              </div>
            </div>

            <div className="panel season-panel">
              <p className="panel__title">
                <span className="panel__title-rule" />
                Season Overview
              </p>
              <div className="season-panel__stats">
                <div className="season-stat">
                  <CalendarIcon size={22} />
                  <span className="season-stat__num">{FIXTURES.length}</span>
                  <span className="season-stat__label">Fixtures</span>
                  <span className="season-stat__sub">2026 – 2027 season</span>
                </div>
                <div className="season-stat">
                  <MapPin size={22} />
                  <span className="season-stat__text">Based in<br />Opglabbeek, Belgium</span>
                </div>
                <div className="season-stat">
                  <Users size={22} />
                  <span className="season-stat__text">Playing since<br />2015</span>
                  <span className="season-stat__sub">More than a team</span>
                </div>
              </div>
            </div>

            <PitchCard />
          </div>
        </div>
      </section>
    </>
  );
}
