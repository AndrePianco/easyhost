import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { excluirConta } from '../services/api';
import './MyProfile.css';

export default function MyProfile() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(null); // 'logout' | 'delete' | null
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem('userEmail') || 'usuário';

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');
    navigate('/');
  };

  const handleDelete = async () => {
    const userId = sessionStorage.getItem('userId');
    setLoading(true);
    try {
      await excluirConta(userId);
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userEmail');
      navigate('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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
        </div>

        {/* Info */}
        <h2 className="profile-name">{email.split('@')[0]}</h2>
        <p className="profile-email">{email}</p>

        {/* Actions */}
        <div className="profile-actions">
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
                disabled={loading}
              >
                {loading ? 'Aguarde...' : showConfirm === 'logout' ? 'Sair' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
