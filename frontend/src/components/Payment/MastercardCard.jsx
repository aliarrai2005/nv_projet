import React from 'react';

const MastercardCard = ({ paymentData, setPaymentData, onSubmit,montant  }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="payment-method-content">
      <div className="card-wrapper mastercard-card">
        <div className="card-deco"></div>
        <div className="card-deco2"></div>
        <div className="card-inner">
          <div className="card-row1">
            <svg className="chip-svg" viewBox="0 0 34 26">
              <rect width="34" height="26" rx="4" fill="#EF9F27" />
              <rect x="3" y="9" width="28" height="8" rx="1" fill="#BA7517" opacity=".5" />
              <rect x="12" y="3" width="10" height="20" rx="1" fill="#BA7517" opacity=".5" />
            </svg>
            <div className="mastercard-logo">
              <div className="mc-circle red"></div>
              <div className="mc-circle orange"></div>
            </div>
          </div>
          <div className="card-number">{paymentData.cardNumber || '5412  ****  ****  3290'}</div>
          <div className="card-bottom">
            <div>
              <div className="card-label">Titulaire</div>
              <div className="card-value">{paymentData.cardHolder || 'Ahmed Karimi'}</div>
            </div>
            <div className="text-right">
              <div className="card-label">Expire</div>
              <div className="card-value">{paymentData.expiryDate || '09 / 27'}</div>
            </div>
          </div>
          <div className="card-brand">Mastercard</div>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="form-group">
          <label className="form-label">Numéro de carte</label>
          <input
            type="text"
            name="cardNumber"
            className="form-input"
            placeholder="0000  0000  0000  0000"
            value={paymentData.cardNumber}
            onChange={handleChange}
            style={{ fontFamily: 'monospace', letterSpacing: '3px' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Titulaire de la carte</label>
          <input
            type="text"
            name="cardHolder"
            className="form-input"
            placeholder="Prénom Nom"
            value={paymentData.cardHolder}
            onChange={handleChange}
          />
        </div>

        <div className="row-2cols">
          <div className="form-group">
            <label className="form-label">Date d'expiration</label>
            <input
              type="text"
              name="expiryDate"
              className="form-input"
              placeholder="MM / AA"
              value={paymentData.expiryDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Code CVV</label>
            <input
              type="password"
              name="cvv"
              className="form-input"
              placeholder="• • •"
              value={paymentData.cvv}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="pay-btn mastercard-btn">
          Payer {montant} MAD
        </button>

        <div className="secure-row">
          <svg className="lock-icon" viewBox="0 0 16 16">
            <rect x="3" y="7" width="10" height="8" rx="2" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          <span className="secure-text">Paiement 100% sécurisé — Mastercard SecureCode</span>
        </div>
      </form>
    </div>
  );
};

export default MastercardCard;