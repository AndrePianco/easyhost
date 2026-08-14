import { useNavigate } from 'react-router-dom';
import './ServerBanner.css';

export default function ServerBanner({ id, name, image, status = 'active', isAddBanner = false }) {
  const navigate = useNavigate();

  if (isAddBanner) {
    return (
      <div
        className="server-banner add-banner"
        onClick={() => navigate('/add-host')}
        role="button"
        tabIndex={0}
        id="btn-add-server"
      >
        <div className="add-banner-content">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Adicionar novo servidor</span>
        </div>
      </div>
    );
  }

  return (
    <div className="server-banner" role="button" tabIndex={0} onClick={() => id && navigate(`/host/${id}`)}>
      <img src={image} alt={name} className="server-banner-bg" loading="lazy" />
      <div className="server-banner-content">
        <div className="server-banner-info">
          <span className="server-banner-name">{name}</span>
          <span className={`server-banner-status ${status}`}>
            <span className="server-banner-status-dot"></span>
            {status === 'active' ? 'Ativo' : 'Inativo'}
          </span>
        </div>
        <div className="server-banner-actions">
          <button className="server-banner-action" title="Editar" aria-label="Editar servidor" onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button className="server-banner-action" title="Excluir" aria-label="Excluir servidor" onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
