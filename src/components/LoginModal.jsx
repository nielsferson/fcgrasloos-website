import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/login-modal.css';

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-modal" role="dialog" aria-modal="true" aria-label="Admin login">
      <div className="login-modal__backdrop" onClick={onClose} />
      <div className="login-modal__panel">
        <button type="button" className="login-modal__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <p className="login-modal__eyebrow">FC GRASLOOS</p>
        <h2 className="login-modal__title">Admin Login</h2>
        <p className="login-modal__sub">Log in to edit match scores on the calendar.</p>

        <form onSubmit={handleSubmit} className="login-modal__form">
          <label className="login-modal__field">
            <span>Username</span>
            <input
              ref={firstFieldRef}
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="login-modal__field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="login-modal__error">{error}</p>}

          <button type="submit" className="btn btn-primary login-modal__submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
