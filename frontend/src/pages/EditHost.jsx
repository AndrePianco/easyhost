import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarHost, atualizarHost } from '../services/api';
import './AddHost.css';

export default function EditHost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: '',
    image: '',
    link: '',
    status: 'active',
    notes: '',
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  // Carrega os dados atuais do host
  useEffect(() => {
    if (!sessionStorage.getItem('userId')) {
      navigate('/');
      return;
    }

    buscarHost(id)
      .then((host) => {
        setForm({
          name: host.name || '',
          image: host.image || '',
          link: host.link || '',
          status: host.status || 'active',
          notes: host.notes || '',
        });
      })
      .catch((err) => setErro(err.message))
      .finally(() => setCarregando(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSalvando(true);
    try {
      await atualizarHost(id, form);
      navigate(`/host/${id}`);
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <div className="addhost-page">
        <div className="addhost-card">
          <p style={{ color: 'var(--text-muted)' }}>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="addhost-page">
      <div className="addhost-card">
        <h1 className="addhost-title">
          Editar <span>Host</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-name">Nome</label>
            <input
              id="host-name"
              className="addhost-input"
              type="text"
              placeholder="Ex: Servidor Minecraft"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Image URL */}
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-image">URL da Imagem</label>
            <input
              id="host-image"
              className="addhost-input"
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                style={{ marginTop: 12, borderRadius: 8, maxHeight: 160, width: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>

          {/* Link */}
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-link">Link / IP de conexão</label>
            <input
              id="host-link"
              className="addhost-input"
              type="text"
              placeholder="Ex: play.meuservidor.com:25565"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          </div>

          {/* Status */}
          <div className="addhost-form-group">
            <label className="addhost-label">Status</label>
            <div className="addhost-radio-group">
              <label className="addhost-radio">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={form.status === 'active'}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                />
                <span className="addhost-radio-custom"></span>
                <span className="addhost-radio-label">Ativo</span>
              </label>
              <label className="addhost-radio">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={form.status === 'inactive'}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                />
                <span className="addhost-radio-custom"></span>
                <span className="addhost-radio-label">Inativo</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-notes">Observações</label>
            <textarea
              id="host-notes"
              className="addhost-textarea"
              placeholder="Anotações sobre o servidor..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            ></textarea>
          </div>

          {erro && (
            <p style={{ color: '#ff5555', fontSize: '0.85rem', marginBottom: 12, padding: '8px 12px', background: 'rgba(255,85,85,0.1)', borderRadius: 6, border: '1px solid rgba(255,85,85,0.3)' }}>
              {erro}
            </p>
          )}

          <button type="submit" className="addhost-submit" id="btn-save-host" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
          <button
            type="button"
            className="addhost-cancel"
            onClick={() => navigate(`/host/${id}`)}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
