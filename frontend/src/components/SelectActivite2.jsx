import './SelectActivite2.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllTerrains } from '../api/terrains.api';
import MapLink from '../components/MapLink';  // ← Ajout

function SelectActivite2() {
  const navigate = useNavigate();
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [selectedVille, setSelectedVille] = useState('all');
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllTerrains()
      .then((res) => {
        // Conserver toutes les propriétés (dont lat, lng)
        const terrainsList = res.data.map(t => ({
          ...t,
          activite: 'football',
          prix: t.prix || '200 MAD/h',
        }));
        setTerrains(terrainsList);
      })
      .catch((err) => {
        console.error(err);
        setError('Impossible de charger les terrains. Vérifiez le backend.');
        setTerrains([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const villes = [
    { value: 'all', label: 'Toutes les villes' },
    { value: 'Casablanca', label: 'Casablanca' },
    { value: 'Rabat', label: 'Rabat' },
    { value: 'Fès', label: 'Fès' },
    { value: 'Marrakech', label: 'Marrakech' },
    { value: 'Tanger', label: 'Tanger' },
  ];

  const filteredTerrains = terrains.filter((terrain) => {
    const matchVille = selectedVille === 'all' || terrain.ville === selectedVille;
    return matchVille;
  });

  const handleTerrainSelect = (terrainId) => {
    setSelectedTerrain(selectedTerrain === terrainId ? null : terrainId);
  };

  const handleContinue = () => {
    if (selectedTerrain) {
      const terrainData = terrains.find((t) => t.id === selectedTerrain);
      navigate('/date-heure', { state: { terrain: terrainData } });
    }
  };

  return (
    <main className="booking-main">
      <div className="form-header">
        <h1>Sélectionnez votre terrain</h1>
        <div className="header-line"></div>
      </div>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <div className="filters-container">
        <div className="filter-group">
          <label>Ville :</label>
          <div className="select-wrapper">
            <select value={selectedVille} onChange={(e) => setSelectedVille(e.target.value)}>
              {villes.map((ville) => (
                <option key={ville.value} value={ville.value}>{ville.label}</option>
              ))}
            </select>
            <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        <div className="filter-stats">
          {loading ? (
            <span className="stats-badge">Chargement...</span>
          ) : (
            <span className="stats-badge">
              {filteredTerrains.length} terrain{filteredTerrains.length > 1 ? 's' : ''} disponible{filteredTerrains.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">⚽ Chargement des terrains...</div>
      ) : (
        <div className="terrains-grid">
          {filteredTerrains.length > 0 ? (
            filteredTerrains.map((terrain) => (
              <div
                key={terrain.id}
                className={`terrain-card ${selectedTerrain === terrain.id ? 'selected' : ''}`}
                onClick={() => handleTerrainSelect(terrain.id)}
              >
                <div className="terrain-image">
                  <img src={terrain.image} alt={terrain.nom} />
                  <div className="terrain-type-badge">{terrain.type}</div>
                  {selectedTerrain === terrain.id && <div className="selected-check">✓</div>}
                </div>
                <div className="terrain-info">
                  <h3>{terrain.nom}</h3>
                  <div className="terrain-details">
                    <span>📍 {terrain.ville}</span>
                    <span>⏱️ {terrain.prix}</span>
                    <span>👥 {terrain.capacity}</span>
                    {terrain.surface && <span>🌿 {terrain.surface}</span>}
                  </div>
                  {/* Intégration du lien Google Maps */}
                  {terrain.lat && terrain.lng && (
                    <div style={{ marginTop: '8px' }}>
                      <MapLink lat={terrain.lat} lng={terrain.lng} text="📍 Voir l'emplacement" />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Aucun terrain disponible dans cette ville.</p>
            </div>
          )}
        </div>
      )}

      <div className="form-actions">
        <button className="btn-continuer" onClick={handleContinue} disabled={!selectedTerrain || loading}>
          Continuer
        </button>
      </div>
    </main>
  );
}

export default SelectActivite2;