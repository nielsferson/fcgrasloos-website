import { useState } from 'react';
import { Instagram, Facebook, Youtube, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { scoresEnabled } from '../lib/scoresApi';
import LoginModal from './LoginModal';
import '../styles/footer.css';

export default function Footer() {
  const { isAuthed, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src="/images/logo.png" alt="FC Grasloos crest" className="site-footer__logo" />
          <span className="site-footer__brand-text">
            <span className="site-footer__name">FC GRASLOOS</span>
            <span className="site-footer__tagline">OPGLABBEEK &bull; EST. 2015</span>
          </span>
        </div>

        <div className="site-footer__social">
          <span className="site-footer__follow">Follow us</span>
          <a
            href="#"
            aria-label="FC Grasloos on Instagram (coming soon)"
            title="Coming soon"
            className="site-footer__icon"
            onClick={(e) => e.preventDefault()}
          >
            <Instagram size={18} />
          </a>
          <a
            href="#"
            aria-label="FC Grasloos on Facebook (coming soon)"
            title="Coming soon"
            className="site-footer__icon"
            onClick={(e) => e.preventDefault()}
          >
            <Facebook size={18} />
          </a>
          <a
            href="#"
            aria-label="FC Grasloos on YouTube (coming soon)"
            title="Coming soon"
            className="site-footer__icon"
            onClick={(e) => e.preventDefault()}
          >
            <Youtube size={18} />
          </a>
        </div>

        <div className="site-footer__location">
          <span>Opglabbeek, Belgium</span>
          <strong>Play Together. Go Further.</strong>
        </div>

        {scoresEnabled && (
          <button
            type="button"
            className="site-footer__auth"
            onClick={() => (isAuthed ? logout() : setLoginOpen(true))}
          >
            {isAuthed ? (
              <>
                <LogOut size={14} /> Log out
              </>
            ) : (
              <>
                <LogIn size={14} /> Login
              </>
            )}
          </button>
        )}
      </div>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </footer>
  );
}
