    import { useState } from 'react';
import { getAllStades, getStadesByVille } from '../../api/stades.api';
import { createTerrain } from '../../api/terrains.api';

const villesDisponibles = [
  { value: 'casablanca', label: 'Casablanca' },
  { value: 'rabat', label: 'Rabat' },
  { value: 'fes', label: 'Fès' },
  { value: 'marrakesh', label: 'Marrakech' },
  { value: 'tanger', label: 'Tanger' },
];

const AdminOverpassImport = ({ onImport }) => {
  const [selectedVille, setSelectedVille] = useState('casablanca');
  const [stades, setStades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStade, setSelectedStade] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editable, setEditable] = useState({ nom: '', ville: '', surface: '', image: '' });

  const fetchStades = async () => {
    setLoading(true);
    try {
      const res = await getStadesByVille(selectedVille);
      const data = res.data; // array of stades
      console.log('Stades récupérés depuis Overpass:', data);
      setStades(data);
      setSelectedStade(null);
    } catch (err) {
      console.error(err);
      alert('Erreur chargement Overpass');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStade = (stade) => {
    setSelectedStade(stade);
    setEditable({
      nom: stade.nom || '',
      ville: selectedVille.charAt(0).toUpperCase() + selectedVille.slice(1),
      surface: stade.surface || 'Gazon',
      image: stade.image || '',
    });
    setEditMode(true);
  };

  const handleImport = async () => {
    if (!editable.nom || !editable.ville) {
      alert('Nom et ville requis');
      return;
    }
    const newTerrain = {
      nom: editable.nom,
      type: 'Football',
      ville: editable.ville,
      prix: '200 MAD/h',
      capacity: '22 joueurs',
      surface: editable.surface,
      image: editable.image || 'https://images.unsplash.com/photo-1459865264687-287d4539c1ac?w=400&h=250&fit=crop',
    };
    await createTerrain(newTerrain);
    alert('Terrain ajouté avec succès');
    setSelectedStade(null);
    setEditMode(false);
    if (onImport) onImport();
  };

  return (
    <div className="admin-card">
      <div className="admin-title">🌍 Importer depuis OpenStreetMap (Overpass)</div>
      <div className="ville-filter">
        <label>Ville : </label>
        <select value={selectedVille} onChange={(e) => setSelectedVille(e.target.value)}>
          {villesDisponibles.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
        </select>
        <button className="btn-primary" onClick={fetchStades} disabled={loading}>Charger les stades</button>
      </div>

      {loading && <p>Chargement...</p>}

      {stades.length > 0 && !editMode && (
        <div>
          <p>{stades.length} stades trouvés. Cliquez sur un pour l'importer et modifier les infos.</p>
          <div className="overpass-results">
            {stades.map((s, idx) => (
              <div key={idx} className="overpass-item" onClick={() => handleSelectStade(s)}>
                <strong>{s.nom || 'Sans nom'}</strong>
                <div>{s.surface || 'Surface inconnue'}</div>
                <div>{s.lat?.toFixed(4)}, {s.lon?.toFixed(4)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editMode && selectedStade && (
        <div className="import-form">
          <h4>Prévisualisation avant ajout</h4>
          <div className="form-grid">
            <input value={editable.nom} onChange={e => setEditable({ ...editable, nom: e.target.value })} placeholder="Nom du terrain" />
            <input value={editable.ville} onChange={e => setEditable({ ...editable, ville: e.target.value })} placeholder="Ville" />
            <input value={editable.surface} onChange={e => setEditable({ ...editable, surface: e.target.value })} placeholder="Surface" />
            <input value={editable.image} onChange={e => setEditable({ ...editable, image: e.target.value })} placeholder="URL image" />
          </div>
          <button className="btn-primary" onClick={handleImport}>➕ Ajouter ce terrain</button>
          <button className="btn-sm" onClick={() => { setEditMode(false); setSelectedStade(null); }}>Annuler</button>
        </div>
      )}
    </div>
  );
};
export default AdminOverpassImport;