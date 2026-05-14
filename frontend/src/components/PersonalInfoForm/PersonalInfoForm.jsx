import React, { useState } from 'react';

const PersonalInfoForm = ({ onContinue, onBack, onClose }) => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue(formData);
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <button className="back-btn" title="Retour" onClick={onBack}>
          <svg viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="modal-title">Vos informations</span>
        <button className="close-btn" title="Fermer" onClick={onClose}>✕</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Prénom</label>
              <input 
                type="text" 
                name="firstName"
                placeholder="Saisir le prénom" 
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label><span className="req">*</span> Nom de famille</label>
              <input 
                type="text" 
                name="lastName"
                placeholder="Saisir le nom de famille" 
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>E-mail</label>
              <input 
                type="email" 
                name="email"
                placeholder="Saisir l'adresse e-mail" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <div className="phone-wrap">
                <div className="phone-flag">
                  <svg width="22" height="15" viewBox="0 0 22 15" xmlns="http://www.w3.org/2000/svg">
                    <rect width="22" height="15" fill="#c1272d"/>
                    <polygon points="11,4 12.18,7.64 15.99,7.64 12.9,9.86 14.09,13.5 11,11.28 7.91,13.5 9.1,9.86 6.01,7.64 9.82,7.64" fill="none" stroke="#006233" strokeWidth="0.8"/>
                  </svg>
                  <svg viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Saisir le numéro de téléphone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label><span className="req">*</span> Numéro de carte d'identité nationale</label>
              <input 
                type="text" 
                name="cin"
                className="cin-input" 
                value={formData.cin}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn-continue">Continuer</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;