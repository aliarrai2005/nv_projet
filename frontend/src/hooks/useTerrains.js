import { useState, useEffect } from 'react';
import { getAllStades } from '../api/stades.api';

/**
 * Hook personnalisé pour charger les terrains depuis le backend
 * @returns {{ terrains, loading, error, refetch }}
 */
export function useTerrains() {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const villeLabels = {
    casablanca: 'Casablanca',
    rabat: 'Rabat',
    fes: 'Fès',
    marrakesh: 'Marrakech',
    tanger: 'Tanger',
  };

  const fetchTerrains = () => {
    setLoading(true);
    setError(null);
    getAllStades()
      .then((res) => {
        const raw = res.data;
        const list = [];
        Object.entries(raw).forEach(([villeKey, arr]) => {
          if (Array.isArray(arr)) {
            arr.forEach((stade) => {
              list.push({
                id: stade.id,
                nom: stade.nom || `Terrain - ${villeLabels[villeKey] || villeKey}`,
                ville: villeLabels[villeKey] || villeKey,
                villeKey,
                surface: stade.surface || 'Gazon',
                acces: stade.acces || 'Public',
                lat: stade.lat,
                lon: stade.lon,
                activite: 'football',
                type: 'Football',
                prix: '200 MAD/h',
                capacity: '22 joueurs',
                image: 'https://images.unsplash.com/photo-1459865264687-287d4539c1ac?w=400&h=250&fit=crop',
              });
            });
          }
        });
        setTerrains(list);
      })
      .catch((err) => {
        console.error('Erreur API terrains:', err);
        setError('Impossible de charger les terrains depuis le serveur.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTerrains();
  }, []);

  return { terrains, loading, error, refetch: fetchTerrains };
}
