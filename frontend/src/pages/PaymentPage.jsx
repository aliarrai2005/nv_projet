import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm  from '../components/Payment/PaymentForm';
import OrderSummary from '../components/Payment/OrderSummary';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    bank: 'cih',
    otpCode: ''
  });

  const handlePaymentSubmit = () => {
    // Logique de traitement du paiement
    console.log('Payment submitted:', { paymentMethod, paymentData });
    alert('Paiement en cours de traitement...');
    navigate('/payment-success'); // Rediriger vers la page de succès après le paiement
  };

  return (
    <div className="payment-page">
      <div className="payment-grid">
        <PaymentForm 
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          onSubmit={handlePaymentSubmit}
        />
        <OrderSummary />
      </div>
    </div>
  );
};

export default PaymentPage;