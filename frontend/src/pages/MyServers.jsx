import { useState } from 'react';
import ServerBanner from '../components/ServerBanner';
import './MyServers.css';

const allServers = [
  {
    id: 1,
    name: 'Minecraft',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/header.jpg',
    status: 'active',
  },
  {
    id: 2,
    name: 'Project Zomboid',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg',
    status: 'active',
  },
  {
    id: 3,
    name: 'Palworld',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg',
    status: 'active',
  },
  {
    id: 4,
    name: 'Conan Exiles',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440900/header.jpg',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'GTA V FiveM',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
    status: 'inactive',
  },
];

export default function MyServers() {
  const [filter, setFilter] = useState('all');

  const filteredServers = allServers.filter((server) => {
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
        {filteredServers.map((server) => (
          <ServerBanner
            key={server.id}
            id={server.id}
            name={server.name}
            image={server.image}
            status={server.status}
          />
        ))}
        <ServerBanner isAddBanner />

        {filteredServers.length === 0 && (
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
