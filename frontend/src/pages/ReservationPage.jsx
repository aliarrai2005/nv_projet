import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm/PersonalInfoForm';
import { createReservation } from '../api/reservations.api';
import './ReservationPage.css';

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { terrain, date, heureDebut, heureFin } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleContinue = async (formData) => {
    if (!terrain || !date || !heureDebut) {
      alert('Données de réservation manquantes');
      return;
    }
    setLoading(true);
    try {
      await createReservation({
        terrainId: String(terrain.id),
        terrainNom: terrain.nom,
        date,
        heureDebut,
        heureFin,
        nomClient: `${formData.firstName} ${formData.lastName}`,
        emailClient: formData.email,
        telephone: formData.phone,
      });
      navigate('/payment', { state: { terrain, date, heureDebut, heureFin, client: formData } });
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création de la réservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-container">
      {terrain && (
        <div className="reservation-summary-fixed">
          <div>⚽ {terrain.nom}</div>
          <div>📅 {date}</div>
          <div>🕐 {heureDebut} — {heureFin}</div>
        </div>
      )}
      <div className="wrapper">
        <Sidebar etapeActive={3} />
        <PersonalInfoForm onContinue={handleContinue} onBack={() => navigate('/date-heure', { state: { terrain } })} onClose={() => navigate('/')} />
      </div>
      {loading && <div className="loading-overlay">Création de la réservation...</div>}
    </div>
  );
};
export default ReservationPage;