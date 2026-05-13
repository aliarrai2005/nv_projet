import api from './axiosConfig';

export const getAllTerrains = () => api.get('/terrains');
export const getTerrainById = (id) => api.get(`/terrains/${id}`);
export const createTerrain = (data) =>{ console.log('Creating terrain with data:', data); return api.post('/terrains', data); };
export const updateTerrain = (id, data) => api.put(`/terrains/${id}`, data);
export const deleteTerrain = (id) => api.delete(`/terrains/${id}`);