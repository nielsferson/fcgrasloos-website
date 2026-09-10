import '../styles/pitch-card.css';

export default function PitchCard() {
  return (
    <div className="pitch-card">
      <svg className="pitch-card__ball" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <polygon points="50,28 61,36 57,49 43,49 39,36" fill="currentColor" opacity="0.5" />
      </svg>
      <p className="pitch-card__title">
        Small<br />Pitch.<br /><span>Big<br />Passion.</span>
      </p>
      <p className="pitch-card__sub">
        <span className="pitch-card__rule" />
        FUTSAL UNITES US
      </p>
    </div>
  );
}
