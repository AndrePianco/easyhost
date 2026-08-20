import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { listarHosts } from '../services/api';
import { useLang } from '../context/LangContext';
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [hosts, setHosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('userId')) {
      navigate('/');
      return;
    }
    listarHosts()
      .then((todos) => setHosts(todos.filter((h) => h.status === 'active')))
      .catch(() => setHosts([]))
      .finally(() => setCarregando(false));
  }, [navigate]);

  return (
    <div className="homepage">
      <h1 className="homepage-title">
        {t('homeTitle')} <span>{t('homeActiveSpan')}:</span>
      </h1>
      <div className="homepage-grid">
        {carregando && <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>{t('homeLoading')}</p>}
        {!carregando && hosts.map((host) => (
          <GameCard key={host.id} id={host.id} name={host.name} image={host.image} />
        ))}
        {!carregando && hosts.length === 0 && (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>{t('homeEmpty')}</p>
        )}
        <GameCard isAddCard />
      </div>
    </div>
  );
}
