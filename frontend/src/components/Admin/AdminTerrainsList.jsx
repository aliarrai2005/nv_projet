import { useState, useEffect } from 'react';
import { getAllTerrains, createTerrain, updateTerrain, deleteTerrain } from '../../api/terrains.api';
import MapLink from '../MapLink';

const AdminTerrainsList = ({ refreshTrigger, onRefresh }) => {
  const [terrains, setTerrains] = useState([]);
  const [form, setForm] = useState({ nom: '', type: 'Football', ville: '', prix: '', capacity: '', surface: '', image: '', lat: '', lng: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTerrains = async () => {
    const res = await getAllTerrains();
    setTerrains(res.data);
  };

  useEffect(() => { fetchTerrains(); }, [refreshTrigger]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...form };
    if (dataToSend.lat) dataToSend.lat = parseFloat(dataToSend.lat);
    if (dataToSend.lng) dataToSend.lng = parseFloat(dataToSend.lng);
    if (editingId) {
      await updateTerrain(editingId, dataToSend);
    } else {
      await createTerrain(dataToSend);
    }
    fetchTerrains();
    setForm({ nom: '', type: 'Football', ville: '', prix: '', capacity: '', surface: '', image: '', lat: '', lng: '' });
    setEditingId(null);
    setShowForm(false);
    if (onRefresh) onRefresh();
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setForm({
      nom: t.nom || '', type: t.type || 'Football', ville: t.ville || '',
      prix: t.prix || '', capacity: t.capacity || '', surface: t.surface || '',
      image: t.image || '', lat: t.lat || '', lng: t.lng || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce terrain définitivement ?')) {
      await deleteTerrain(id);
      fetchTerrains();
      if (onRefresh) onRefresh();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ nom: '', type: 'Football', ville: '', prix: '', capacity: '', surface: '', image: '', lat: '', lng: '' });
    setShowForm(false);
  };

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div className="admin-title" style={{ marginBottom: 0 }}>🗂️ Terrains existants</div>
        <button
          className="btn-primary"
          onClick={() => { resetForm(); setShowForm(!showForm); }}
        >
          {showForm ? '✕ Annuler' : '+ Ajouter un terrain'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: 'rgba(163, 214, 72, 0.04)',
          border: '1px solid rgba(163, 214, 72, 0.15)',
          borderRadius: 14,
          padding: 20,
          marginBottom: 24
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'rgba(163, 214, 72, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1rem'
          }}>
            {editingId ? '✏️ Modifier le terrain' : '➕ Nouveau terrain'}
          </div>
          <form onSubmit={handleSubmit} className="form-grid">
            <input placeholder="Nom du terrain" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required />
            <input placeholder="Ville" value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} required />
            <input placeholder="Prix (ex: 250 MAD/h)" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} />
            <input placeholder="Capacité (ex: 22 joueurs)" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
            <input placeholder="Surface (Gazon, Synthétique...)" value={form.surface} onChange={e => setForm({ ...form, surface: e.target.value })} />
            <input placeholder="URL image" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <input placeholder="Latitude" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />
            <input placeholder="Longitude" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>Football</option>
              <option>Tennis</option>
              <option>Basketball</option>
            </select>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                {editingId ? '💾 Enregistrer' : '➕ Ajouter'}
              </button>
              {editingId && (
                <button type="button" className="btn-sm" onClick={resetForm}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Cards grid */}
      <div className="terrain-cards-grid">
        {terrains.map(t => (
          <div key={t.id} className="terrain-admin-card">
            <div className="terrain-admin-card-header">
              <div className="terrain-admin-image">
                {t.image
                  ? <img src={t.image} alt={t.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                  : '⚽'
                }
              </div>
              <div className="terrain-admin-info">
                <div className="terrain-admin-name">{t.nom}</div>
                <div className="terrain-admin-id">ID #{t.id}</div>
              </div>
            </div>

            <div className="terrain-admin-meta">
              <div className="terrain-admin-meta-row">
                <span className="terrain-admin-meta-label">Ville</span>
                <span className="terrain-admin-meta-value">📍 {t.ville}</span>
              </div>
              <div className="terrain-admin-meta-row">
                <span className="terrain-admin-meta-label">Prix</span>
                <span className="terrain-admin-meta-value">⏱️ {t.prix || '—'}</span>
              </div>
              <div className="terrain-admin-meta-row">
                <span className="terrain-admin-meta-label">Surface</span>
                <span className="terrain-admin-meta-value">🌿 {t.surface || '—'}</span>
              </div>
              <div className="terrain-admin-meta-row">
                <span className="terrain-admin-meta-label">Capacité</span>
                <span className="terrain-admin-meta-value">👥 {t.capacity || '—'}</span>
              </div>
              {t.lat && t.lng && (
                <div className="terrain-admin-meta-row">
                  <span className="terrain-admin-meta-label">Carte</span>
                  <MapLink lat={t.lat} lng={t.lng} text="📍 Voir" />
                </div>
              )}
            </div>

            <div className="terrain-admin-actions">
              <button className="terrain-action-btn terrain-action-edit" onClick={() => handleEdit(t)}>
                ✏️ Modifier
              </button>
              <button className="terrain-action-btn terrain-action-delete" onClick={() => handleDelete(t.id)}>
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTerrainsList;