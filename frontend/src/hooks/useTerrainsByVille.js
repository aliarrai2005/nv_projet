import { useState, useEffect } from 'react';
import { getStadesByVille } from '../api/stades.api';

/**
 * Hook pour charger les terrains d'une ville précise
 * @param {string} ville - ex: "casablanca"
 */
export function useTerrainsByVille(ville) {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ville) return;
    setLoading(true);
    setError(null);
    getStadesByVille(ville)
      .then((res) => setTerrains(res.data))
      .catch((err) => {
        console.error(`Erreur API stades/${ville}:`, err);
        setError(`Impossible de charger les terrains de ${ville}.`);
      })
      .finally(() => setLoading(false));
  }, [ville]);

  return { terrains, loading, error };
}
