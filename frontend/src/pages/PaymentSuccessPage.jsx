import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { terrain, date, heureDebut, heureFin, client, montant, paymentMethod } = location.state || {};

  // Génération d'une référence unique (ex: # + timestamp + aléatoire)
  const reference = `#${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

  // Formatage de la date
  const formattedDate = date
    ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Date non définie';

  // Affichage du moyen de paiement
  let paymentMethodDisplay = 'Carte bancaire';
  if (paymentMethod === 'visa') paymentMethodDisplay = 'VISA ****';
  else if (paymentMethod === 'mastercard') paymentMethodDisplay = 'Mastercard ****';
  else if (paymentMethod === 'cmi') paymentMethodDisplay = 'CMI (virement)';

  // Nom du client
  const clientName = client?.nom || (client?.firstName && client?.lastName && `${client.firstName} ${client.lastName}`) || client?.fullName || 'Client';

  // Timeline (avec heure réelle du créneau)
  const now = new Date();
  const timeline = [
    { title: 'Réservation créée', time: now.toLocaleString('fr-FR'), status: 'done' },
    { title: 'Paiement validé', time: now.toLocaleString('fr-FR'), status: 'done' },
    { title: 'Confirmation email', time: 'En attente d\'envoi', status: 'pending' },
    { title: 'Accès au terrain', time: heureDebut || '--:--', status: 'pending' }
  ];

  const handleDownloadPDF = () => {
    alert('Téléchargement du reçu PDF (à implémenter)');
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
              <span className="receipt-value">{reference}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Date</span>
              <span className="receipt-value">{formattedDate}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Terrain</span>
              <span className="receipt-value">{terrain?.nom || 'Terrain non spécifié'}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Créneau</span>
              <span className="receipt-value">{heureDebut} – {heureFin}</span>
            </div>

            <div className="receipt-divider"></div>

            <div className="receipt-row">
              <span className="receipt-label">Moyen de paiement</span>
              <span className="receipt-value">{paymentMethodDisplay}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Statut</span>
              <span className="status-badge">Payé</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Montant total</span>
              <span className="receipt-value green">{montant} MAD</span>
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
              <span>{clientName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span>{client?.email || 'Non renseigné'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Téléphone</span>
              <span>{client?.phone || 'Non renseigné'}</span>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">Suivi de la réservation</div>
            <div className="timeline">
              {timeline.map((item, idx) => (
                <div key={idx} className="timeline-item">
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