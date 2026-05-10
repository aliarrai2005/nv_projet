import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm/PersonalInfoForm';
import { createReservation } from '../api/reservations.api';
import './ReservationPage.css';

const ReservationPage = () => {
  const [isSidePanelMinimized, setIsSidePanelMinimized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer les données passées depuis DateHeure
  const { terrain, date, heureDebut, heureFin } = location.state || {};

  const handleContinue = (formData) => {
    // Sauvegarder la réservation dans localStorage
    if (terrain && date && heureDebut) {
      createReservation({
        terrainId: String(terrain.id),
        terrainNom: terrain.nom,
        date,
        heureDebut,
        heureFin,
        nomClient: formData.nom || '',
        emailClient: formData.email || '',
        telephone: formData.telephone || '',
      });
    }
    navigate('/payment', { state: { terrain, date, heureDebut, heureFin, ...formData } });
  };

  const handleBack = () => {
    navigate('/date-heure', { state: { terrain } });
  };

  const handleClose = () => {
    if (window.confirm('Voulez-vous vraiment annuler la réservation ?')) {
      navigate('/');
    }
  };

  return (
    <div className="reservation-container">
      <div className="bg-blur"></div>

      {/* Résumé de la réservation */}
      {terrain && date && heureDebut && (
        <div style={{
          position: 'fixed',
          top: 16,
          right: 16,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          padding: '12px 16px',
          fontSize: 13,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: 260,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: '#1e40af' }}>📋 Votre réservation</div>
          <div>⚽ {terrain.nom}</div>
          <div>📅 {date}</div>
          <div>🕐 {heureDebut} — {heureFin}</div>
        </div>
      )}

      <div className={`wrapper ${isSidePanelMinimized ? 'minimized' : ''}`}>
        <Sidebar etapeActive={3} />
        <PersonalInfoForm
          onContinue={handleContinue}
          onBack={handleBack}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default ReservationPage;
