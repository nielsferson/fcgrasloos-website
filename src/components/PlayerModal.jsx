import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cardSrc } from '../data/players';
import '../styles/player-modal.css';

export default function PlayerModal({ player, onClose, onPrev, onNext }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!player) return null;

  return (
    <div className="player-modal" role="dialog" aria-modal="true" aria-label={`${player.name} player card`}>
      <div className="player-modal__backdrop" onClick={onClose} />

      <div className="player-modal__panel">
        <button ref={closeRef} type="button" className="player-modal__close" onClick={onClose} aria-label="Close player card">
          <X size={22} />
        </button>

        <button type="button" className="player-modal__nav player-modal__nav--prev" onClick={onPrev} aria-label="Previous player">
          <ChevronLeft size={26} />
        </button>
        <button type="button" className="player-modal__nav player-modal__nav--next" onClick={onNext} aria-label="Next player">
          <ChevronRight size={26} />
        </button>

        <div className="player-modal__media">
          <img src={cardSrc(player.id)} alt={`${player.name} (${player.pos}) player card`} key={player.id} />
          <span className={'player-modal__jersey' + (player.isGK ? ' player-modal__jersey--gk' : '')}>
            {player.number}
          </span>
        </div>

        <div className="player-modal__info">
          <p className="player-modal__pos">{player.pos}</p>
          <h2 className="player-modal__name">{player.name}</h2>
          <p className="player-modal__role">{player.role}</p>
        </div>
      </div>
    </div>
  );
}
