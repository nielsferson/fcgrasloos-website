import { Calendar as CalendarIcon, MapPin, Users, ArrowRight } from 'lucide-react';
import PageIntro from '../components/PageIntro';
import PitchCard from '../components/PitchCard';
import { FIXTURES, getNextMatch } from '../data/fixtures';
import '../styles/calendar.css';

const LEFT_MONTHS = ['September 2026', 'October 2026', 'November 2026', 'December 2026', 'January 2027', 'February 2027'];
const RIGHT_MONTHS = ['March 2027', 'April 2027', 'May 2027', 'June 2027'];

function groupByMonth(months) {
  return months
    .map((month) => ({ month, matches: FIXTURES.filter((f) => f.month === month) }))
    .filter((group) => group.matches.length > 0);
}

function FixtureTable({ groups }) {
  return (
    <div className="fixture-column">
      <div className="fixture-header-row">
        <span>Date</span>
        <span>Time</span>
        <span>Opponent</span>
        <span>H/A</span>
        <span>Venue</span>
      </div>
      {groups.map((group) => (
        <div key={group.month} className="fixture-group">
          <p className="fixture-group__month">{group.month.toUpperCase()}</p>
          {group.matches.map((m) => (
            <div className="fixture-row" key={m.iso + m.opponent}>
              <span className="fixture-row__date">{m.date}</span>
              <span className="fixture-row__time">{m.time}</span>
              <span className="fixture-row__opponent">{m.opponent}</span>
              <span>
                <span className={'fixture-badge' + (m.home ? ' fixture-badge--home' : ' fixture-badge--away')}>
                  {m.home ? 'HOME' : 'AWAY'}
                </span>
              </span>
              <span className="fixture-row__venue">{m.venue}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Calendar() {
  const nextMatch = getNextMatch();

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
          <div className="panel fixtures-panel">
            <p className="panel__title">
              <span className="panel__title-rule" />
              Fixtures
            </p>
            <div className="fixtures-panel__columns">
              <FixtureTable groups={groupByMonth(LEFT_MONTHS)} />
              <FixtureTable groups={groupByMonth(RIGHT_MONTHS)} />
            </div>
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

              <a href="#fixtures" className="btn btn-outline-light next-match__cta">
                View Match Details <ArrowRight size={18} />
              </a>
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
