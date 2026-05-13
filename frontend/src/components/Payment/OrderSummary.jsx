const OrderSummary = ({ terrain, date, heureDebut, heureFin, client, montant }) => {
  const defaultTerrain = { nom: 'Arena Sport Casablanca', ville: 'Maarif, Casablanca' };
  const defaultClient = { nom: 'Ahmed Karimi', email: 'ahmed@mail.com', phone: '+212 654 434 343', address: 'Casablanca, MA' };
  const t = terrain || defaultTerrain;
  const c = client || defaultClient;
  const reference = '#35304';

  const prixAffiche = montant ? `${montant} MAD` : '150 MAD';

  return (
    <div className="order-summary">
      <div className="summary-title">Récapitulatif de commande</div>
      <div className="order-card">
        <div className="order-card-header">
          <div className="terrain-icon">⚽</div>
          <div>
            <div className="terrain-name">{t.nom}</div>
            <div className="terrain-location">{t.ville}</div>
          </div>
        </div>
        <div className="order-rows">
          <div className="order-row"><span className="order-label">Date</span><span className="order-value">{date || '25 avr. 2026'}</span></div>
          <div className="order-row"><span className="order-label">Créneau</span><span className="order-value">{heureDebut} – {heureFin}</span></div>
          <div className="order-row"><span className="order-label">Réservation</span><span className="order-value mono">{reference}</span></div>
        </div>
        <div className="total-row"><span className="total-label">Total à payer</span><span className="total-value">{prixAffiche}</span></div>
      </div>
      <div className="customer-card">
        <div className="customer-header"><div className="customer-avatar">{c.firstName?.charAt(0)}</div><div className="customer-name">{c.firstName}</div></div>
        <div className="customer-rows">
          <div className="customer-row"><span className="customer-label">Téléphone</span><span>{c.phone}</span></div>
          <div className="customer-row"><span className="customer-label">Email</span><span>{c.email}</span></div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;