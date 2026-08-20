import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarHost, alternarStatus, excluirHost } from '../services/api';
import './HostDetail.css';

export default function HostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [host, setHost] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('userId')) {
      navigate('/');
      return;
    }

    buscarHost(id)
      .then(setHost)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [id, navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(host.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleStatus = async () => {
    setActionLoading(true);
    try {
      const atualizado = await alternarStatus(id);
      setHost(atualizado);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await excluirHost(id);
      navigate('/servers');
    } catch (err) {
      alert(err.message);
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (carregando) {
    return (
      <div className="host-detail">
        <p style={{ color: 'var(--text-muted)', padding: '80px 0', textAlign: 'center' }}>Carregando...</p>
      </div>
    );
  }

  if (erro || !host) {
    return (
      <div className="host-detail">
        <button className="host-detail-back" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar
        </button>
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.2rem' }}>{erro || 'Servidor não encontrado.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="host-detail">
      {/* Back */}
      <button className="host-detail-back" onClick={() => navigate(-1)} id="btn-back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Voltar
      </button>

      {/* Hero */}
      <div className="host-detail-hero">
        {host.image ? (
          <img src={host.image} alt={host.name} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: 64, height: 64, color: 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            </svg>
          </div>
        )}
        <div className="host-detail-hero-overlay">
          <div className="host-detail-hero-info">
            <h1 className="host-detail-hero-name">{host.name}</h1>
            <span className={`host-detail-hero-status ${host.status}`}>
              <span className="host-detail-hero-status-dot"></span>
              {host.status === 'active' ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="host-detail-grid">
        {/* Main Info */}
        <div className="host-detail-card">
          <h2 className="host-detail-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Informações
          </h2>

          {host.link && (
            <div className="host-detail-link-row">
              <div className="host-detail-link-info">
                <span className="host-detail-row-label">Link / IP de conexão</span>
                <span className="host-detail-link-value">{host.link}</span>
              </div>
              <button
                className={`host-detail-copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                title={copied ? 'Copiado!' : 'Copiar link'}
                aria-label="Copiar link"
                id="btn-copy-link"
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
          )}

          {host.notes && (
            <>
              <div className="host-detail-row" style={{ borderBottom: 'none', paddingBottom: '4px' }}>
                <span className="host-detail-row-label">Observações</span>
              </div>
              <p className="host-detail-notes">{host.notes}</p>
            </>
          )}
        </div>

        {/* Sidebar Actions */}
        <div>
          <div className="host-detail-card">
            <h2 className="host-detail-card-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Ações
            </h2>

            <div className="host-detail-actions">
              <button
                className={`host-detail-action-btn ${host.status === 'active' ? 'toggle-inactive' : 'toggle-active'}`}
                onClick={handleToggleStatus}
                disabled={actionLoading}
                id="btn-toggle-status"
              >
                {host.status === 'active' ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                    Desativar
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Ativar
                  </>
                )}
              </button>

              <button
                className="host-detail-action-btn edit"
                onClick={() => navigate(`/edit-host/${host.id}`)}
                id="btn-edit-host"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar
              </button>

              <button
                className="host-detail-action-btn delete"
                onClick={() => setShowConfirm(true)}
                disabled={actionLoading}
                id="btn-delete-host"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Excluir
              </button>
            </div>

            <div className="host-detail-meta">
              <div className="host-detail-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Criado em {formatDate(host.created_at)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="host-detail-confirm" onClick={() => setShowConfirm(false)}>
          <div className="host-detail-confirm-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="host-detail-confirm-title">Excluir servidor?</h3>
            <p className="host-detail-confirm-text">
              O servidor <strong>{host.name}</strong> será removido permanentemente. Esta ação não pode ser desfeita.
            </p>
            <div className="host-detail-confirm-actions">
              <button className="host-detail-action-btn edit" onClick={() => setShowConfirm(false)}>
                Cancelar
              </button>
              <button
                className="host-detail-action-btn delete"
                onClick={handleDelete}
                disabled={actionLoading}
                style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
              >
                {actionLoading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
