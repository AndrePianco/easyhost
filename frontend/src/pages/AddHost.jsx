import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarHost } from '../services/api';
import { useLang } from '../context/LangContext';
import './AddHost.css';

export default function AddHost() {
  const navigate = useNavigate();
  const { t } = useLang();

  const [form, setForm] = useState({ name: '', image: '', link: '', status: 'active', notes: '' });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await criarHost(form);
      navigate('/servers');
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="addhost-page">
      <div className="addhost-card">
        <h1 className="addhost-title">{t('addHostTitle')} <span>{t('hostWord')}</span></h1>
        <form onSubmit={handleSubmit}>
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-name">{t('fieldName')}</label>
            <input id="host-name" className="addhost-input" type="text" placeholder={t('fieldNamePlaceholder')}
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-image">{t('fieldImage')}</label>
            <input id="host-image" className="addhost-input" type="url" placeholder={t('fieldImagePlaceholder')}
              value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            {form.image && (
              <img src={form.image} alt="Preview"
                style={{ marginTop: 12, borderRadius: 8, maxHeight: 160, width: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }} />
            )}
          </div>
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-link">{t('fieldLink')}</label>
            <input id="host-link" className="addhost-input" type="text" placeholder={t('fieldLinkPlaceholder')}
              value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </div>
          <div className="addhost-form-group">
            <label className="addhost-label">{t('fieldStatus')}</label>
            <div className="addhost-radio-group">
              <label className="addhost-radio">
                <input type="radio" name="status" value="active" checked={form.status === 'active'} onChange={(e) => setForm({ ...form, status: e.target.value })} />
                <span className="addhost-radio-custom"></span>
                <span className="addhost-radio-label">{t('active')}</span>
              </label>
              <label className="addhost-radio">
                <input type="radio" name="status" value="inactive" checked={form.status === 'inactive'} onChange={(e) => setForm({ ...form, status: e.target.value })} />
                <span className="addhost-radio-custom"></span>
                <span className="addhost-radio-label">{t('inactive')}</span>
              </label>
            </div>
          </div>
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-notes">{t('fieldNotes')}</label>
            <textarea id="host-notes" className="addhost-textarea" placeholder={t('fieldNotesPlaceholder')}
              value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}></textarea>
          </div>
          {erro && <p style={{ color: '#ff5555', fontSize: '0.85rem', marginBottom: 12, padding: '8px 12px', background: 'rgba(255,85,85,0.1)', borderRadius: 6, border: '1px solid rgba(255,85,85,0.3)' }}>{erro}</p>}
          <button type="submit" className="addhost-submit" id="btn-save-host" disabled={carregando}>
            {carregando ? t('saving') : t('save')}
          </button>
          <button type="button" className="addhost-cancel" onClick={() => navigate(-1)}>{t('cancelBtn')}</button>
        </form>
      </div>
    </div>
  );
}
