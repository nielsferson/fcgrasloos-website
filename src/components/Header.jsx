import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../styles/header.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/team', label: 'Team' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent background scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  function goToNextMatch(e) {
    setMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('next-match')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      e.preventDefault();
      navigate('/', { state: { scrollTo: 'next-match' } });
    }
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo.png" alt="FC Grasloos crest" className="site-header__logo" />
          <span className="site-header__brand-text">
            <span className="site-header__name">FC GRASLOOS</span>
            <span className="site-header__tagline">OPGLABBEEK &bull; EST. 2015</span>
          </span>
        </NavLink>

        <nav className="site-header__nav site-header__nav--desktop" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    'site-header__link' + (isActive ? ' site-header__link--active' : '')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/" className="btn btn-primary site-header__cta" onClick={goToNextMatch}>
          Play Together<br />Go Further
        </Link>

        <button
          className="site-header__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={'site-header__mobile' + (menuOpen ? ' site-header__mobile--open' : '')}>
        <nav aria-label="Mobile">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    'site-header__mobile-link' + (isActive ? ' site-header__mobile-link--active' : '')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/"
            className="btn btn-primary site-header__mobile-cta"
            onClick={goToNextMatch}
          >
            Play Together Go Further
          </Link>
        </nav>
      </div>
    </header>
  );
}
