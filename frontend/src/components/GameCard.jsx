import { useNavigate } from 'react-router-dom';
import './GameCard.css';

export default function GameCard({ id, name, image, isAddCard = false, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAddCard) {
      navigate('/add-host');
    } else if (onClick) {
      onClick();
    } else if (id) {
      navigate(`/host/${id}`);
    }
  };

  if (isAddCard) {
    return (
      <div className="game-card add-card" onClick={handleClick} role="button" tabIndex={0} id="btn-add-game">
        <div className="add-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <span className="add-card-label">Adicionar</span>
      </div>
    );
  }

  return (
    <div className="game-card" onClick={handleClick} role="button" tabIndex={0}>
      <img src={image} alt={name} className="game-card-image" loading="lazy" />
      <div className="game-card-overlay">
        <span className="game-card-name">{name}</span>
      </div>
    </div>
  );
}
