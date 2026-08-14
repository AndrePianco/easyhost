import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './HostDetail.css';

// Demo data — will be replaced by API
const hostsData = {
  1: {
    id: 1,
    name: 'Minecraft',
    game: 'Minecraft Java Edition',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/header.jpg',
    status: 'active',
    link: 'play.meuservidor.com:25565',
    notes: 'Servidor survival vanilla com amigos. Versão 1.21.1.\nSem mods, apenas datapacks de qualidade de vida.\nBackup automático a cada 6 horas.',
    createdAt: '2025-03-15',
  },
  2: {
    id: 2,
    name: 'Project Zomboid',
    game: 'Project Zomboid',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg',
    status: 'active',
    link: '192.168.1.100:16261',
    notes: 'Servidor PvE com mods de armas e veículos.\nDificuldade apocalíptica.',
    createdAt: '2025-06-20',
  },
  3: {
    id: 3,
    name: 'Palworld',
    game: 'Palworld',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg',
    status: 'active',
    link: 'palworld.meuhost.com:8211',
    notes: 'Servidor dedicado com rates 2x.\nMáx 16 jogadores.',
    createdAt: '2025-01-22',
  },
  4: {
    id: 4,
    name: 'Conan Exiles',
    game: 'Conan Exiles',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440900/header.jpg',
    status: 'inactive',
    link: 'conan.meuhost.com:7777',
    notes: 'Servidor PvP — pausado por falta de jogadores.',
    createdAt: '2024-11-05',
  },
  5: {
    id: 5,
    name: 'GTA V FiveM',
    game: 'GTA V — FiveM',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
    status: 'inactive',
    link: 'cfx.re/join/abc123',
    notes: 'Servidor RP brasileiro. Inativo temporariamente para atualização de scripts.',
    createdAt: '2025-02-10',
  },
};

export default function HostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const host = hostsData[id];

  if (!host) {
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
          <p style={{ fontSize: '1.2rem' }}>Servidor não encontrado.</p>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(host.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    // TODO: integrate with backend
    navigate('/servers');
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

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
        <img src={host.image} alt={host.name} />
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

          <div className="host-detail-row">
            <span className="host-detail-row-label">Jogo</span>
            <span className="host-detail-row-value">{host.game}</span>
          </div>

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
                Criado em {formatDate(host.createdAt)}
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
              <button className="host-detail-action-btn delete" onClick={handleDelete} style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
