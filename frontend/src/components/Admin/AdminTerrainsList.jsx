import { useState, useEffect } from 'react';
import { getAllTerrains, createTerrain, updateTerrain, deleteTerrain } from '../../api/terrains.api';
import MapLink from '../MapLink';  // ← Ajout

const AdminTerrainsList = ({ refreshTrigger, onRefresh }) => {
  const [terrains, setTerrains] = useState([]);
  const [form, setForm] = useState({ nom: '', type: 'Football', ville: '', prix: '', capacity: '', surface: '', image: '', lat: '', lng: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchTerrains = async () => {
    const res = await getAllTerrains();
    setTerrains(res.data);
  };

  useEffect(() => {
    fetchTerrains();
  }, [refreshTrigger]);

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
    if (onRefresh) onRefresh();
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setForm({
      nom: t.nom || '',
      type: t.type || 'Football',
      ville: t.ville || '',
      prix: t.prix || '',
      capacity: t.capacity || '',
      surface: t.surface || '',
      image: t.image || '',
      lat: t.lat || '',
      lng: t.lng || '',
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce terrain définitivement ?')) {
      await deleteTerrain(id);
      fetchTerrains();
      if (onRefresh) onRefresh();
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-title">📋 Terrains existants</div>
      <form onSubmit={handleSubmit} className="form-grid">
        <input placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required />
        <input placeholder="Ville" value={form.ville} onChange={e => setForm({ ...form, ville: e.target.value })} required />
        <input placeholder="Prix (ex: 250 MAD/h)" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} />
        <input placeholder="Capacité" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
        <input placeholder="Surface" value={form.surface} onChange={e => setForm({ ...form, surface: e.target.value })} />
        <input placeholder="URL image" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <input placeholder="Latitude" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />
        <input placeholder="Longitude" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option>Football</option><option>Tennis</option><option>Basketball</option>
        </select>
        <button type="submit" className="btn-primary">{editingId ? 'Modifier' : 'Ajouter'}</button>
        {editingId && <button type="button" className="btn-sm" onClick={() => { setEditingId(null); setForm({ nom: '', type: 'Football', ville: '', prix: '', capacity: '', surface: '', image: '', lat: '', lng: '' }); }}>Annuler</button>}
      </form>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Nom</th><th>Ville</th><th>Prix</th><th>Carte</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {terrains.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.nom}</td>
                <td>{t.ville}</td>
                <td>{t.prix}</td>
                <td>
                  {t.lat && t.lng ? <MapLink lat={t.lat} lng={t.lng} text="Voir sur Maps" /> : '-'}
                </td>
                <td>
                  <button className="btn-sm btn-edit" onClick={() => handleEdit(t)}>✏️</button>
                  <button className="btn-sm btn-delete" onClick={() => handleDelete(t.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTerrainsList;