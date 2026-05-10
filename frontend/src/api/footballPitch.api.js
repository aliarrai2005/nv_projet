import api from './axiosConfig';

/**
 * Récupère tous les terrains de football depuis OpenStreetMap (Overpass API)
 * GET /api/football-pitches
 */
export const getFootballPitches = () => api.get('/football-pitches');
