import axios from 'axios';

const api = axios.create({
  // En développement : le proxy Vite redirige /api → http://localhost:3001/api
  // En production : utiliser la variable d'environnement VITE_API_URL
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
