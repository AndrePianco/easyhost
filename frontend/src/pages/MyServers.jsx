import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerBanner from '../components/ServerBanner';
import { listarHosts } from '../services/api';
import './MyServers.css';

export default function MyServers() {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    // Redireciona se não estiver logado
    if (!sessionStorage.getItem('userId')) {
      navigate('/');
      return;
    }

    listarHosts()
      .then(setServers)
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [navigate]);

  const filteredServers = servers.filter((server) => {
    if (filter === 'all') return true;
    return server.status === filter;
  });

  return (
    <div className="servers-page">
      <div className="servers-header">
        <h1 className="servers-title">Todos os meus hosts:</h1>
        <div className="servers-filters">
          <button
            className={`servers-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            id="filter-all"
          >
            Todos
          </button>
          <button
            className={`servers-filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
            id="filter-active"
          >
            Ativos
          </button>
          <button
            className={`servers-filter-btn ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
            id="filter-inactive"
          >
            Inativos
          </button>
        </div>
      </div>

      <div className="servers-list">
        {carregando && <p style={{ color: 'var(--text-muted)', padding: '40px 0' }}>Carregando servidores...</p>}
        {erro && <p style={{ color: '#ff5555', padding: '40px 0' }}>{erro}</p>}

        {!carregando && !erro && filteredServers.map((server) => (
          <ServerBanner
            key={server.id}
            id={server.id}
            name={server.name}
            image={server.image}
            status={server.status}
          />
        ))}

        {!carregando && <ServerBanner isAddBanner />}

        {!carregando && !erro && filteredServers.length === 0 && (
          <div className="servers-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
            <p>Nenhum servidor encontrado com esse filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
