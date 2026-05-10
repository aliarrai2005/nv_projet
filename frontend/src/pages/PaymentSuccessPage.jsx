import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  
  const receiptData = {
    reference: '#35304',
    date: '25 avr. 2026',
    terrain: 'Arena Sport',
    timeSlot: '10:00 – 11:00',
    paymentMethod: 'VISA ****8741',
    amount: '150.00 MAD'
  };

  const timeline = [
    { title: 'Réservation créée', time: '25 avr. 2026 — 09:20', status: 'done' },
    { title: 'Paiement validé', time: '25 avr. 2026 — 09:25', status: 'done' },
    { title: 'Confirmation email', time: 'En attente d\'envoi', status: 'pending' },
    { title: 'Accès au terrain', time: '25 avr. 2026 — 10:00', status: 'pending' }
  ];

  const handleDownloadPDF = () => {
    alert('Téléchargement du reçu PDF');
  };

  return (
    <div className="success-page">
      <div className="success-grid">
        <div className="success-card">
          <div className="success-header">
            <div className="check-circle">
              <span className="check-icon">✓</span>
            </div>
            <div className="success-title">Paiement validé !</div>
            <div className="success-subtitle">Votre réservation est confirmée</div>
          </div>
          
          <div className="receipt-body">
            <div className="receipt-section-title">Reçu de paiement</div>
            
            <div className="receipt-row">
              <span className="receipt-label">Référence</span>
              <span className="receipt-value">{receiptData.reference}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Date</span>
              <span className="receipt-value">{receiptData.date}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Terrain</span>
              <span className="receipt-value">{receiptData.terrain}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Créneau</span>
              <span className="receipt-value">{receiptData.timeSlot}</span>
            </div>
            
            <div className="receipt-divider"></div>
            
            <div className="receipt-row">
              <span className="receipt-label">Moyen de paiement</span>
              <span className="receipt-value">{receiptData.paymentMethod}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Statut</span>
              <span className="status-badge">Payé</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Montant total</span>
              <span className="receipt-value green">{receiptData.amount}</span>
            </div>
            
            <button className="btn-download" onClick={handleDownloadPDF}>
              Télécharger le reçu PDF
            </button>
            <button className="btn-home" onClick={() => navigate('/')}>
              Retour à l'accueil
            </button>
          </div>
        </div>

        <div className="info-side">
          <div className="info-card">
            <div className="info-card-title">Informations du client</div>
            <div className="info-row">
              <span className="info-label">Nom</span>
              <span>Ahmed Karimi</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span>ahmed@mail.com</span>
            </div>
            <div className="info-row">
              <span className="info-label">Téléphone</span>
              <span>+212 654 434 343</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">Suivi de la réservation</div>
            <div className="timeline">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className={`timeline-dot ${item.status === 'done' ? 'done' : ''}`}></div>
                  <div className="timeline-content">
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;