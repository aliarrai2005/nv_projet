import api from './axiosConfig';

export const getCreneauxOccupes = async (terrainId, date) => {
  const response = await api.get('/reservations/occupies', {
    params: { terrainId, date }
  });
  return response.data;
};

export const createReservation = async (reservationData) => {
  const response = await api.post('/reservations', reservationData);
  return response.data;
};

export const cancelReservation = async (id) => {
  const response = await api.patch(`/reservations/${id}/cancel`);
  return response.data;
};


export const getAllReservations = async () => {
  const response = await api.get('/reservations');
  return response.data;
};

export const deleteReservation = async (id) => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data;
};