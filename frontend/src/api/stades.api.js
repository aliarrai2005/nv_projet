import api from './axiosConfig';

/**
 * Récupère tous les stades regroupés par ville
 * GET /api/stades
 */
export const getAllStades = () => api.get('/stades');

/**
 * Récupère les stades d'une ville spécifique
 * GET /api/stades/:ville
 * @param {string} ville - ex: "casablanca", "rabat", "marrakesh", "fes", "tanger"
 */
export const getStadesByVille = (ville) => api.get(`/stades/${ville}`);
    