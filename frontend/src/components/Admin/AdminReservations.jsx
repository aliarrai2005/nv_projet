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

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch { return dateStr; }
  };

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div className="admin-title" style={{ marginBottom: 0 }}>📅 Réservations</div>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.78rem',
          color: 'rgba(163, 214, 72, 0.5)',
          fontWeight: 600
        }}>
          {reservations.length} réservation{reservations.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="reservation-cards-grid">
        {reservations.map(r => (
          <div key={r.id} className="reservation-card">
            <div className="reservation-card-header">
              <div>
                <div className="reservation-card-title">{r.terrainNom || 'Terrain inconnu'}</div>
                <div className="reservation-card-id">Réf. #{r.id}</div>
              </div>
              <span className={`reservation-status-badge ${r.statut === 'annulée' ? 'status-cancelled' : 'status-active'}`}>
                {r.statut === 'annulée' ? <i className="fas fa-times"></i>  : <i className="fas fa-check"></i>}
                {r.statut === 'annulée' ? ' Annulée' : ' Active'}
              </span>
            </div>

            <div className="reservation-card-body">
              <div className="reservation-detail">
                <span className="reservation-detail-label">Date</span>
                <span className="reservation-detail-value"><i className="fas fa-calendar"></i> {formatDate(r.date)}</span>
              </div>
              <div className="reservation-detail">
                <span className="reservation-detail-label">Horaire</span>
                <span className="reservation-detail-value"><i className="fas fa-clock"></i> {r.heureDebut} – {r.heureFin}</span>
              </div>
              <div className="reservation-detail">
                <span className="reservation-detail-label">Client</span>
                <span className="reservation-detail-value"><i className="fas fa-user"></i> {r.nomClient || '—'}</span>
              </div>
              <div className="reservation-detail">
                <span className="reservation-detail-label">Statut</span>
                <span className="reservation-detail-value">{r.statut}</span>
              </div>
            </div>

            <div className="reservation-card-actions">
              {r.statut !== 'annulée' && (
                <button
                  className="terrain-action-btn terrain-action-edit"
                  onClick={() => handleCancel(r.id)}
                >
                  <i className="fas fa-times"></i> Annuler
                </button>
              )}
              <button
                className="terrain-action-btn terrain-action-delete"
                onClick={() => handleDelete(r.id)}
              >
                <i className="fas fa-trash"></i> Supprimer
              </button>
            </div>
          </div>
        ))}

        {reservations.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            color: 'rgba(200, 220, 160, 0.3)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.9rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(130, 200, 60, 0.12)',
            borderRadius: 14
          }}>
            Aucune réservation pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservations;