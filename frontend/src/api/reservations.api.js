const STORAGE_KEY = 'reservations_sportify';

// Récupérer toutes les réservations
export const getAllReservations = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Créer une réservation
export const createReservation = (data) => {
  const reservations = getAllReservations();
  const nouvelle = {
    ...data,
    id: Date.now().toString(),
    statut: 'confirmée',
    createdAt: new Date().toISOString(),
  };
  reservations.push(nouvelle);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  return nouvelle;
};

// Récupérer les créneaux occupés pour un terrain + date
export const getCreneauxOccupes = (terrainId, date) => {
  const reservations = getAllReservations();
  return reservations
    .filter(
      (r) =>
        r.terrainId === String(terrainId) &&
        r.date === date &&
        r.statut !== 'annulée'
    )
    .map((r) => r.heureDebut); // ex: ["08:00", "14:00"]
};

// Annuler une réservation
export const cancelReservation = (id) => {
  const reservations = getAllReservations();
  const updated = reservations.map((r) =>
    r.id === id ? { ...r, statut: 'annulée' } : r
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
