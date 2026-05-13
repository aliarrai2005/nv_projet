import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PaymentForm from '../components/Payment/PaymentForm';
import OrderSummary from '../components/Payment/OrderSummary';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const navigate = useNavigate();
  const location = useLocation();
  const { terrain, date, heureDebut, heureFin, client } = location.state || {};

  const getPrixNumerique = (prixString) => {
    if (!prixString) return 150;
    const match = prixString.match(/\d+/);
    return match ? parseInt(match[0]) : 150;
  };
  const prixTotal = terrain ? getPrixNumerique(terrain.prix) : 150;

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: {client} ? `${client.firstName} ${client.lastName}` : '',
    expiryDate: '',
    cvv: '',
    bank: 'cih',
    otpCode: '',
  });

  const handlePaymentSubmit = () => {
    alert(`Paiement de ${prixTotal} MAD accepté !`);
    navigate('/payment-success', {
      state: {
        terrain,
        date,
        heureDebut,
        heureFin,
        client,
        montant: prixTotal,
        paymentMethod, // ← méthode de paiement sélectionnée
      },
    });
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
          montant={prixTotal}
        />
        <OrderSummary
          terrain={terrain}
          date={date}
          heureDebut={heureDebut}
          heureFin={heureFin}
          client={client}
          montant={prixTotal}
        />
      </div>
    </div>
  );
};

export default PaymentPage;