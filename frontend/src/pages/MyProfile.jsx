import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyProfile.css';

export default function MyProfile() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(null); // 'logout' | 'delete' | null

  const handleLogout = () => {
    // TODO: integrate with backend
    navigate('/');
  };

  const handleDelete = () => {
    // TODO: integrate with backend
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Avatar */}
        <div className="profile-avatar">
          <div className="profile-avatar-ring"></div>
          <div className="profile-avatar-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <button className="profile-avatar-edit" aria-label="Editar avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        </div>

        {/* Info */}
        <h2 className="profile-name">Seu Nome aqui</h2>
        <p className="profile-email">fulano@gmail.com</p>

        {/* Actions */}
        <div className="profile-actions">
          <button className="profile-btn primary" id="btn-reset-password">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Redefinir senha
          </button>

          <button
            className="profile-btn outline"
            onClick={() => setShowConfirm('logout')}
            id="btn-logout"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sair
          </button>

          <div className="profile-divider"></div>

          <button
            className="profile-delete"
            onClick={() => setShowConfirm('delete')}
            id="btn-delete-account"
          >
            Excluir conta
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="profile-confirm" onClick={() => setShowConfirm(null)}>
          <div className="profile-confirm-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="profile-confirm-title">
              {showConfirm === 'logout' ? 'Sair da conta?' : 'Excluir conta?'}
            </h3>
            <p className="profile-confirm-text">
              {showConfirm === 'logout'
                ? 'Você será redirecionado para a tela de login.'
                : 'Esta ação é irreversível. Todos os seus dados serão perdidos.'}
            </p>
            <div className="profile-confirm-actions">
              <button
                className="profile-btn outline"
                onClick={() => setShowConfirm(null)}
              >
                Cancelar
              </button>
              <button
                className={`profile-btn ${showConfirm === 'delete' ? 'danger' : 'primary'}`}
                onClick={showConfirm === 'logout' ? handleLogout : handleDelete}
              >
                {showConfirm === 'logout' ? 'Sair' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
