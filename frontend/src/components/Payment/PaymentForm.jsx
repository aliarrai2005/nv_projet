import React from 'react';
import VisaCard from './VisaCard';
import MastercardCard from './MastercardCard';
import CMIForm from './CMIForm';

const PaymentForm = ({ paymentMethod, setPaymentMethod, paymentData, setPaymentData, onSubmit }) => {
  const methods = [
    { id: 'visa', label: 'VISA' },
    { id: 'mastercard', label: 'Mastercard' },
    { id: 'cmi', label: 'CMI' }
  ];

  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case 'visa':
        return (
          <VisaCard 
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            onSubmit={onSubmit}
          />
        );
      case 'mastercard':
        return (
          <MastercardCard 
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            onSubmit={onSubmit}
          />
        );
      case 'cmi':
        return (
          <CMIForm 
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-form-container">
      <div className="methods-tabs">
        {methods.map(method => (
          <button
            key={method.id}
            className={`method-tab ${paymentMethod === method.id ? 'active' : ''}`}
            onClick={() => setPaymentMethod(method.id)}
          >
            {method.label}
          </button>
        ))}
      </div>
      
      {renderPaymentMethodContent()}
    </div>
  );
};

export default PaymentForm;