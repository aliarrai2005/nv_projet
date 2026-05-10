import React from 'react';

const OrderSummary = () => {
  const orderData = {
    reference: '#35304',
    date: '25 avr. 2026',
    timeSlot: '10:00 – 11:00',
    duration: '1 heure',
    total: '150.00 MAD',
    terrain: {
      name: 'Arena Sport Casablanca',
      location: 'Maarif, Casablanca'
    },
    customer: {
      name: 'Ahmed Karimi',
      email: 'ahmed@mail.com',
      phone: '+212 654 434 343',
      address: 'Casablanca, MA'
    }
  };

  return (
    <div className="order-summary">
      <div className="summary-title">Récapitulatif de commande</div>

      <div className="order-card">
        <div className="order-card-header">
          <div className="terrain-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="4" width="16" height="10" rx="2" stroke="#fff" strokeWidth="1.5"/>
              <line x1="9" y1="4" x2="9" y2="14" stroke="#fff" strokeWidth="1"/>
              <circle cx="9" cy="9" r="2" stroke="#fff" strokeWidth="1"/>
            </svg>
          </div>
          <div>
            <div className="terrain-name">{orderData.terrain.name}</div>
            <div className="terrain-location">{orderData.terrain.location}</div>
          </div>
        </div>
        
        <div className="order-rows">
          <div className="order-row">
            <span className="order-label">Date</span>
            <span className="order-value">{orderData.date}</span>
          </div>
          <div className="order-row">
            <span className="order-label">Créneau</span>
            <span className="order-value">{orderData.timeSlot}</span>
          </div>
          <div className="order-row">
            <span className="order-label">Durée</span>
            <span className="order-value">{orderData.duration}</span>
          </div>
          <div className="order-row">
            <span className="order-label">Réservation</span>
            <span className="order-value mono">{orderData.reference}</span>
          </div>
        </div>
        
        <div className="total-row">
          <span className="total-label">Total à payer</span>
          <span className="total-value">{orderData.total}</span>
        </div>
      </div>

      <div className="customer-card">
        <div className="customer-header">
          <div className="customer-avatar">
            {orderData.customer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="customer-name">{orderData.customer.name}</div>
        </div>
        
        <div className="customer-rows">
          <div className="customer-row">
            <span className="customer-label">Téléphone</span>
            <span>{orderData.customer.phone}</span>
          </div>
          <div className="customer-row">
            <span className="customer-label">Email</span>
            <span>{orderData.customer.email}</span>
          </div>
          <div className="customer-row">
            <span className="customer-label">Adresse</span>
            <span>{orderData.customer.address}</span>
          </div>
        </div>
      </div>

      <div className="cgv-box">
        <input type="checkbox" defaultChecked />
        <span>
          En validant ce paiement, vous acceptez les conditions générales 
          d'utilisation du service KickField.
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;