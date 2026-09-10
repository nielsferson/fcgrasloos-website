import '../styles/page-intro.css';

export default function PageIntro({ eyebrow, title, subtitle, scriptLines }) {
  return (
    <section className="page-intro">
      <div className="container page-intro__inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-intro__title">{title}</h1>
          <p className="page-intro__sub">{subtitle}</p>
        </div>
        <div className="page-intro__motto">
          <p className="page-intro__motto-script">
            {scriptLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < scriptLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="page-intro__motto-list">
            <span>Skills</span>
            <span>Friendship</span>
            <span>Passion</span>
            <span>Grasloos</span>
            <span className="page-intro__rule" />
          </div>
        </div>
      </div>
    </section>
  );
}
