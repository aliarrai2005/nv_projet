import './SelectActivite2.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllStades } from '../api/stades.api'

function SelectActivite2() {
    const navigate = useNavigate()
    const [selectedTerrain, setSelectedTerrain] = useState(null)
    const [selectedVille, setSelectedVille] = useState('all')
    const [selectedActivite, setSelectedActivite] = useState('')
    const [terrains, setTerrains] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Charger les terrains depuis le backend au montage du composant
    useEffect(() => {
        setLoading(true)
        setError(null)
        getAllStades()
            .then((res) => {
                // La réponse est un objet { casablanca: [...], rabat: [...], ... }
                const raw = res.data
                const terrainsList = []
                let idCounter = 1

                const villeLabels = {
                    casablanca: 'Casablanca',
                    rabat: 'Rabat',
                    fes: 'Fès',
                    marrakesh: 'Marrakech',
                    tanger: 'Tanger',
                }

                Object.entries(raw).forEach(([villeKey, stadesArr]) => {
                    if (Array.isArray(stadesArr)) {
                        stadesArr.forEach((stade) => {
                            terrainsList.push({
                                id: stade.id || idCounter++,
                                nom: stade.nom || `Terrain - ${villeLabels[villeKey] || villeKey}`,
                                type: 'Football',
                                ville: villeLabels[villeKey] || villeKey,
                                villeKey,
                                prix: '200 MAD/h',
                                capacity: '22 joueurs',
                                surface: stade.surface || 'Gazon',
                                acces: stade.acces || 'Public',
                                lat: stade.lat,
                                lon: stade.lon,
                                activite: 'football',
                                image: 'https://images.unsplash.com/photo-1459865264687-287d4539c1ac?w=400&h=250&fit=crop',
                            })
                        })
                    }
                })

                setTerrains(terrainsList)
            })
            .catch((err) => {
                console.error('Erreur chargement terrains:', err)
                setError('Impossible de charger les terrains. Vérifiez que le backend est démarré.')
                // Données de secours en cas d'erreur
                setTerrains([
                    { id: 1, nom: 'Terrain 1 - Complexe Al Amal', type: 'Football', ville: 'Casablanca', prix: '250 MAD/h', capacity: '22 joueurs', activite: 'football', image: 'https://images.unsplash.com/photo-1459865264687-287d4539c1ac?w=400&h=250&fit=crop' },
                    { id: 2, nom: 'Terrain 2 - Arenas Sport', type: 'Football', ville: 'Rabat', prix: '220 MAD/h', capacity: '20 joueurs', activite: 'football', image: 'https://images.unsplash.com/photo-1522778119029-d64f787b6d97?w=400&h=250&fit=crop' },
                ])
            })
            .finally(() => setLoading(false))
    }, [])

    // Villes disponibles
    const villes = [
        { value: 'all', label: 'Toutes les villes' },
        { value: 'Casablanca', label: 'Casablanca' },
        { value: 'Rabat', label: 'Rabat' },
        { value: 'Fès', label: 'Fès' },
        { value: 'Marrakech', label: 'Marrakech' },
        { value: 'Tanger', label: 'Tanger' },
    ]

    // Activités disponibles
    const activites = [
        { value: '', label: 'Toutes les activités' },
        { value: 'football', label: 'Football' },
        { value: 'tennis', label: 'Tennis' },
        { value: 'basketball', label: 'Basketball' },
        { value: 'natation', label: 'Natation' },
        { value: 'fitness', label: 'Fitness' },
    ]

    // Filtrer les terrains
    const filteredTerrains = terrains.filter((terrain) => {
        const matchVille = selectedVille === 'all' || terrain.ville === selectedVille
        const matchActivite = !selectedActivite || terrain.activite === selectedActivite
        return matchVille && matchActivite
    })

    const handleTerrainSelect = (terrainId) => {
        setSelectedTerrain(selectedTerrain === terrainId ? null : terrainId)
    }

    const handleContinue = () => {
        if (selectedTerrain) {
            const terrainData = terrains.find((t) => t.id === selectedTerrain)
            navigate('/date-heure', {
                state: {
                    terrain: terrainData,
                    activite: selectedActivite || terrainData.activite,
                },
            })
        }
    }

    return (
        <main className="booking-main">
            <div className="form-header">
                <h1>Sélectionnez votre terrain</h1>
                <div className="header-line"></div>
            </div>

            {/* Erreur backend */}
            {error && (
                <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, padding: '10px 16px', marginBottom: 16, color: '#856404', fontSize: 14 }}>
                    ⚠️ {error}
                </div>
            )}

            {/* Filtres */}
            <div className="filters-container">
                <div className="filter-group">
                    <label>Activité :</label>
                    <div className="select-wrapper">
                        <select value={selectedActivite} onChange={(e) => setSelectedActivite(e.target.value)}>
                            {activites.map((act) => (
                                <option key={act.value} value={act.value}>{act.label}</option>
                            ))}
                        </select>
                        <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </div>

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
                        <span className="stats-badge">⏳ Chargement...</span>
                    ) : (
                        <span className="stats-badge">
                            {filteredTerrains.length} terrain{filteredTerrains.length > 1 ? 's' : ''} disponible{filteredTerrains.length > 1 ? 's' : ''}
                        </span>
                    )}
                </div>
            </div>

            {/* Grille des terrains */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>⚽</div>
                    <p>Chargement des terrains depuis le serveur...</p>
                </div>
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
                                    {selectedTerrain === terrain.id && (
                                        <div className="selected-check">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="terrain-info">
                                    <h3 className="terrain-name">{terrain.nom}</h3>
                                    <div className="terrain-details">
                                        <div className="detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span>{terrain.ville}</span>
                                        </div>
                                        <div className="detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 6v6l4 2" />
                                            </svg>
                                            <span>{terrain.prix}</span>
                                        </div>
                                        <div className="detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17 20v-4a4 4 0 0 0-8 0v4" />
                                                <rect x="3" y="8" width="18" height="12" rx="2" />
                                            </svg>
                                            <span>{terrain.capacity}</span>
                                        </div>
                                        {terrain.surface && (
                                            <div className="detail-item">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="2" y="2" width="20" height="20" rx="3" />
                                                    <path d="M2 12h20M12 2v20" />
                                                </svg>
                                                <span>{terrain.surface}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="terrain-description">
                                        Terrain professionnel avec éclairage LED, vestiaires et parking
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <p>Aucun terrain trouvé pour ces critères</p>
                            <button className="reset-filters" onClick={() => { setSelectedActivite(''); setSelectedVille('all') }}>
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Bouton continuer */}
            <div className="form-actions">
                <button className="btn-continuer" onClick={handleContinue} disabled={!selectedTerrain || loading}>
                    Continuer
                </button>
            </div>
        </main>
    )
}

export default SelectActivite2
