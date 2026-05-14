import { useState } from 'react';
import { getAllStades, getStadesByVille } from '../../api/stades.api';
import { createTerrain } from '../../api/terrains.api';
import MapLink from '../MapLink';

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
            lat: stade.lat || 0,
            lng: stade.lon || 0,
        });
        setEditMode(true);
    };


    // Dans la fonction handleImport, ajouter lat t lng
    const handleImport = async () => {
        if (!editable.nom || !editable.ville) {
            alert('Nom et ville requis');
            return;
        }
        const newTerrain = {
            nom: editable.nom,
            type: 'Football',
            ville: editable.ville,
            prix: editable.prix + ' MAD/h' || '200 MAD/h',
            capacity: editable.capacity + ' joueurs' || '22 joueurs',
            surface: editable.surface,
            image: editable.image || 'https://images.unsplash.com/photo-1459865264687-287d4539c1ac?w=400&h=250&fit=crop',
            lat: editable?.lat,   // ← Ajout
            lng: editable?.lng,   // ← Ajout
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
                    <p style={{ color: 'rgba(163, 214, 72, 0.8)' }}><i className="fas fa-info-circle"></i> {stades.length} stades trouvés. Cliquez sur un pour l'importer et modifier les infos.</p>
                    <div className="overpass-results">
                        {stades.map((s, idx) => (
                            <div key={idx} className="overpass-item" onClick={() => handleSelectStade(s)}>
                                <strong><i className="fas fa-futbol"></i> {s.nom || 'Sans nom'}</strong>
                                <div><i className="fas fa-globe-africa"></i> {s.surface || 'Surface inconnue'}</div>
                                <div><i className="fas fa-map-marker-alt"></i> {s.lat?.toFixed(4)}, {s.lon?.toFixed(4)}</div>
                                <div><i className="fas fa-map"></i><MapLink lat={s.lat} lng={s.lon} text=" Voir l'emplacement" /></div>
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
                        <input placeholder="Prix (ex: 250 MAD/h)" value={editable.prix} onChange={e => setEditable({ ...editable, prix: e.target.value })} />
                        <input placeholder="Capacité" value={editable.capacity} onChange={e => setEditable({ ...editable, capacity: e.target.value })} />
                        <input value={editable.image} onChange={e => setEditable({ ...editable, image: e.target.value })} placeholder="URL image" />
                    </div>
                    <button className="btn-primary" onClick={() => { console.log('Importation du terrain'); handleImport() }} ><i className="fas fa-plus"></i> Ajouter ce terrain</button>
                    <button className="btn-sm" onClick={() => { setEditMode(false); setSelectedStade(null); }}> <i className="fas fa-times"></i> Annuler</button>
                </div>
            )}
        </div>
    );
};
export default AdminOverpassImport;