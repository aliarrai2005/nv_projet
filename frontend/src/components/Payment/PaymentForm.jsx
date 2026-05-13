import React from 'react';
import VisaCard from './VisaCard';
import MastercardCard from './MastercardCard';
import CMIForm from './CMIForm';

const PaymentForm = ({ paymentMethod, setPaymentMethod, paymentData, setPaymentData, onSubmit, montant }) => {
  const methods = [
    { id: 'visa', label: 'VISA' },
    { id: 'mastercard', label: 'Mastercard' },
    { id: 'cmi', label: 'CMI' }
  ];

  const renderPaymentMethodContent = () => {
    const commonProps = {
      paymentData,
      setPaymentData,
      onSubmit,
      montant
    };
    switch (paymentMethod) {
      case 'visa':
        return <VisaCard {...commonProps} />;
      case 'mastercard':
        return <MastercardCard {...commonProps} />;
      case 'cmi':
        return <CMIForm {...commonProps} />;
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