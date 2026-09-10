import { Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';
import PageIntro from '../components/PageIntro';
import PitchCard from '../components/PitchCard';
import { FIXTURES, getNextMatch } from '../data/fixtures';
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
  const d = new Date(`${iso}T00:00:00`);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
  };
}

function isPast(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${iso}T00:00:00`) < today;
}

function YearPanel({ year, matches, nextMatch }) {
  const playedCount = matches.filter((m) => isPast(m.iso)).length;

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
            return (
              <div
                key={m.iso + m.opponent}
                className={
                  'fixture-item' +
                  (isNext ? ' fixture-item--next' : '') +
                  (isPast(m.iso) ? ' fixture-item--past' : '')
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
                    <span>{m.venue}</span>
                  </p>
                </div>
                <span className={'fixture-badge' + (m.home ? ' fixture-badge--home' : ' fixture-badge--away')}>
                  {m.home ? 'HOME' : 'AWAY'}
                </span>
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
              <YearPanel key={year} year={year} matches={matches} nextMatch={nextMatch} />
            ))}
          </div>

          <div className="cal-sidebar">
            <div className="next-match">
              <div className="next-match__header">
                <p className="next-match__eyebrow">
                  <span className="next-match__eyebrow-rule" />
                  NEXT MATCH
                </p>
                <span className={'fixture-badge' + (nextMatch.home ? ' fixture-badge--home' : ' fixture-badge--away') + ' next-match__badge'}>
                  {nextMatch.home ? 'HOME' : 'AWAY'}
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
                <div className="next-match__detail next-match__detail--right">
                  <MapPin size={16} />
                  <span>{nextMatch.venue}</span>
                </div>
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
