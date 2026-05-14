import "./Hero1.css";

export default function Hero() {
	return (
		<div className="home-page">

			{/* ══ HERO ══ */}
			<section className="hero-section">

				{/* Animated background */}
				<div className="hero-bg-slider">
					<div className="hero-slide" />
					<div className="hero-slide" />
					<div className="hero-slide" />
				</div>
				<div className="hero-overlay" />
				<div className="hero-glow" />

				{/* Text content — no card here */}
				<div className="hero-content">

					<div className="hero-tag">Réservation en ligne</div>

					<h1 className="hero-title">
						La gestion des{" "}
						<span className="accent">espaces sportifs</span>{" "}
						de la préfecture
					</h1>

					<p className="hero-subtitle">
						Préparez-vous à vivre des moments intenses avec notre système
						de réservation en ligne. Simple, rapide, disponible 24h/24.
					</p>

					<div className="hero-stats">
						<div className="hero-stat">
							<span className="hero-stat-num">22+</span>
							<span className="hero-stat-label">Terrains</span>
						</div>
						<div className="hero-stat-divider" />
						<div className="hero-stat">
							<span className="hero-stat-num">5</span>
							<span className="hero-stat-label">Villes</span>
						</div>
						<div className="hero-stat-divider" />
						<div className="hero-stat">
							<span className="hero-stat-num">24/7</span>
							<span className="hero-stat-label">Disponible</span>
						</div>
					</div>

					<div className="hero-cta-group">
						<a href="/selection-terrain" className="btn-primary-hero">
							Réserver maintenant
							<span className="btn-arrow">→</span>
						</a>
						<a href="" className="btn-secondary-hero">▶ Découvrir</a>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="hero-scroll">
					<div className="hero-scroll-line" />
					<span className="hero-scroll-label">Scroll</span>
				</div>

				{/* Slide dots */}
				<div className="hero-dots">
					<div className="hero-dot" />
					<div className="hero-dot" />
					<div className="hero-dot" />
				</div>
			</section>

			{/* ══ WHY US — section séparée sous le hero ══ */}
			<section className="why-section">
				<div className="why-inner">

					<div className="why-label">Nos avantages</div>
					<h2 className="why-heading">
						Pourquoi nous <span>choisir</span> ?
					</h2>

					<div className="why-grid">
						<div className="why-card">
							<div className="why-card-icon">⚡</div>
							<h3>Réservation instantanée</h3>
							<p>Confirmée en quelques secondes, sans attente ni appel téléphonique.</p>
						</div>
						<div className="why-card">
							<div className="why-card-icon">📍</div>
							<h3>Terrains géolocalisés</h3>
							<p>Trouvez le terrain le plus proche de chez vous grâce à la carte interactive.</p>
						</div>
						<div className="why-card">
							<div className="why-card-icon">💳</div>
							<h3>Paiement sécurisé</h3>
							<p>Réglez en ligne via VISA, Mastercard ou virement CMI en toute sécurité.</p>
						</div>
						<div className="why-card">
							<div className="why-card-icon">🏆</div>
							<h3>Terrains de qualité</h3>
							<p>Gazon naturel et synthétique, entretenus régulièrement pour votre confort.</p>
						</div>
					</div>
				</div>
			</section>

		</div>
	);
}