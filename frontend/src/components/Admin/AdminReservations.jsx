import { useState, useEffect } from 'react';
import { getAllReservations, cancelReservation, deleteReservation } from '../../api/reservations.api';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    const data = await getAllReservations();
    setReservations(data);
  };

  useEffect(() => { fetchReservations(); }, []);

  const handleCancel = async (id) => {
    if (confirm('Annuler cette réservation ?')) {
      await cancelReservation(id);
      fetchReservations();
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer définitivement cette réservation ?')) {
      await deleteReservation(id);
      fetchReservations();
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-title">📅 Gestion des réservations</div>
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Terrain</th><th>Date</th><th>Horaire</th><th>Client</th><th>Statut</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.terrainNom}</td><td>{r.date}</td><td>{r.heureDebut} - {r.heureFin}</td>
                <td>{r.nomClient || '—'}</td><td>{r.statut}</td>
                <td>
                  {r.statut !== 'annulée' && <button className="btn-sm" onClick={() => handleCancel(r.id)}>Annuler</button>}
                  <button className="btn-sm btn-delete" onClick={() => handleDelete(r.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminReservations;