import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddHost.css';

export default function AddHost() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    link: '',
    status: 'active',
    notes: '',
  });
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend
    console.log('Submitting:', { ...form, image: preview });
    navigate('/servers');
  };

  return (
    <div className="addhost-page">
      <div className="addhost-card">
        <h1 className="addhost-title">
          Adicionar <span>Host</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div
            className={`addhost-upload ${dragOver ? 'drag-over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            id="upload-area"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="addhost-upload-preview" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span className="addhost-upload-text">Clique ou arraste uma imagem</span>
                <span className="addhost-upload-hint">PNG, JPG ou WEBP (max. 5MB)</span>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileInput}
              tabIndex={-1}
            />
          </div>

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

          {/* Link */}
          <div className="addhost-form-group">
            <label className="addhost-label" htmlFor="host-link">Link</label>
            <input
              id="host-link"
              className="addhost-input"
              type="url"
              placeholder="https://..."
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

          <button type="submit" className="addhost-submit" id="btn-save-host">
            Salvar
          </button>
          <button
            type="button"
            className="addhost-cancel"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
