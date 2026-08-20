import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ServerBanner from '../components/ServerBanner';
import { listarHosts } from '../services/api';
import { useLang } from '../context/LangContext';
import './MyServers.css';

export default function MyServers() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [servers, setServers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
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
    const matchesFilter = filter === 'all' || server.status === filter;
    const matchesSearch = server.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="servers-page">
      <div className="servers-header">
        <h1 className="servers-title">{t('serversTitle')}</h1>
        <div className="servers-filters">
          <div className="servers-search-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="servers-search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="servers-search-input"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className={`servers-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')} id="filter-all">{t('filterAll')}</button>
          <button className={`servers-filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')} id="filter-active">{t('filterActive')}</button>
          <button className={`servers-filter-btn ${filter === 'inactive' ? 'active' : ''}`} onClick={() => setFilter('inactive')} id="filter-inactive">{t('filterInactive')}</button>
        </div>
      </div>

      <div className="servers-list">
        {carregando && <p style={{ color: 'var(--text-muted)', padding: '40px 0' }}>{t('serversLoading')}</p>}
        {erro && <p style={{ color: '#ff5555', padding: '40px 0' }}>{erro}</p>}

        {!carregando && !erro && filteredServers.map((server) => (
          <ServerBanner
            key={server.id}
            id={server.id}
            name={server.name}
            image={server.image}
            status={server.status}
            onDeleted={(deletedId) => setServers((prev) => prev.filter((s) => s.id !== deletedId))}
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
            <p>{t('serversEmpty')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
