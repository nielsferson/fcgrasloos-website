import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Calendar as CalendarIcon, MapPin, Users, Trophy, Handshake } from 'lucide-react';
import PitchCard from '../components/PitchCard';
import { getNextMatch } from '../data/fixtures';
import '../styles/home.css';

export default function Home() {
  const nextMatch = getNextMatch();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <>
      <section className="hero">
        <div className="hero__paint-topleft" aria-hidden="true" />
        <div className="hero__paint-bottomright" aria-hidden="true" />

        <div className="hero__inner container">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              MORE THAN A TEAM <span className="hero__eyebrow-dash" /> A SHARED PASSION
            </p>
            <h1 className="hero__title">
              FC<br />GRASLOOS
            </h1>
            <p className="hero__subtitle">
              Based in Opglabbeek, Belgium<br />
              Playing since 2015
            </p>
            <div className="hero__actions">
              <Link to="/team" className="btn btn-primary">
                Meet the Team <ArrowRight size={18} />
              </Link>
              <Link to="/calendar" className="btn btn-outline-light">
                <CalendarIcon size={18} /> View Calendar
              </Link>
            </div>
          </div>

          <div className="hero__media">
            <div className="hero__frame">
              <img src="/images/team-photo.jpg" alt="FC Grasloos squad photo at the goal" />
            </div>
            <p className="hero__side-text">
              Same<br />Team<br />Higher<br />Goals
            </p>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about__inner container">
          <div className="about__copy">
            <p className="eyebrow">ABOUT FC GRASLOOS</p>
            <h2 className="about__title">
              Passion on<br />a smaller pitch
            </h2>
            <p className="about__text">
              FC Grasloos is a futsal team from Opglabbeek, Belgium. We&rsquo;ve
              been playing together since 2015, united by our love for the
              game, our friendship and the belief that great things happen on
              and off the court.
            </p>

            <div className="about__stats">
              <div className="about__stat">
                <Users size={26} />
                <span className="about__stat-title">Teamwork</span>
                <span className="about__stat-sub">On and off the pitch</span>
              </div>
              <div className="about__stat">
                <Trophy size={26} />
                <span className="about__stat-title">Progress</span>
                <span className="about__stat-sub">Every season counts</span>
              </div>
              <div className="about__stat">
                <Handshake size={26} />
                <span className="about__stat-title">Good vibes</span>
                <span className="about__stat-sub">More than a game</span>
              </div>
            </div>
          </div>

          <div className="about__cards">
            <div className="match-card" id="next-match">
              <p className="match-card__eyebrow">NEXT MATCH</p>

              <div className="match-card__teams">
                <div className="match-card__team">
                  <div className="match-card__crest">
                    <img src="/images/logo.png" alt="FC Grasloos crest" />
                  </div>
                  <span>FC GRASLOOS</span>
                </div>

                <span className="match-card__vs">VS</span>

                <div className="match-card__team">
                  <div className="match-card__crest match-card__crest--tba">?</div>
                  <span>{nextMatch.opponent}</span>
                </div>
              </div>

              <div className="match-card__details">
                <div className="match-card__detail">
                  <CalendarIcon size={16} />
                  <span>{nextMatch.date.toUpperCase()}<br />{nextMatch.time}</span>
                </div>
                <div className="match-card__detail match-card__detail--right">
                  <MapPin size={16} />
                  <span>{nextMatch.venue.toUpperCase()}<br />Opglabbeek, Belgium</span>
                </div>
              </div>

              <Link to="/calendar" className="btn btn-outline-light match-card__cta">
                View Full Calendar <ArrowRight size={18} />
              </Link>
            </div>

            <PitchCard />
          </div>
        </div>
      </section>
    </>
  );
}
