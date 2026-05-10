import "./Navbar.css";

export default function Navbar() {
  return (
  <header className="header-section w-full" style={{width:"100%"}}>
		<div className="header-section-left-part">
		<h5>
			Site de réservation des terrains de football
		</h5>
		</div>
		<div className="header-section-right-part">
			<a href="">Accueil</a>
			<a href="">À propos</a>
			<a href="">Nos activités</a>
			<a href="">Mes réservations</a>
			<a href="">Contact</a>
		</div>
	</header>
  );
}