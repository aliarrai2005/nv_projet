// DateHeure.jsx (composant unique fusionné)
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCreneauxOccupes, createReservation } from '../api/reservations.api';
import './DateHeure.css';

// Horaires disponibles
const HORAIRES_DISPONIBLES = [
  { debut: '08:00', fin: '09:00' },
  { debut: '09:00', fin: '10:00' },
  { debut: '10:00', fin: '11:00' },
  { debut: '11:00', fin: '12:00' },
  { debut: '14:00', fin: '15:00' },
  { debut: '15:00', fin: '16:00' },
  { debut: '16:00', fin: '17:00' },
  { debut: '17:00', fin: '18:00' },
  { debut: '20:00', fin: '21:00' },
  { debut: '23:00', fin: '00:00' },
];

const NOMS_MOIS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
];

function DateHeure() {
  const navigate = useNavigate();
  const location = useLocation();
  const terrain = location.state?.terrain || null;

  // États
  const [mois, setMois] = useState(4);        // avril = 3 (0-index)
  const [annee, setAnnee] = useState(2026);
  const [jours, setJours] = useState([]);      // tableau d'objets jour
  const [dateSelectionnee, setDateSelectionnee] = useState(null); // { jour, mois, annee }
  const [horaires, setHoraires] = useState([]);
  const [horaireSelectionne, setHoraireSelectionne] = useState(null);
  const [reservations, setReservations] = useState({}); // cache terrainId/date -> créneaux

  // Récupérer les réservations pour un terrain et une date
  const getOccupations = useCallback(async (terrainId, dateStr) => {
    if (!terrainId) return [];
    // Appel API (ou localStorage)
    const occupes = await getCreneauxOccupes(terrainId, dateStr);
    return occupes;
  }, []);

  // Générer les jours du mois (calcul pur, pas de DOM)
  const genererJoursMois = useCallback((mois, annee) => {
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);
    const premierJour = new Date(annee, mois, 1);
    let jourSemaine = premierJour.getDay();
    if (jourSemaine === 0) jourSemaine = 7;
    const dernierJourPrecedent = new Date(annee, mois, 0).getDate();
    const nbJours = new Date(annee, mois + 1, 0).getDate();

    const joursArray = [];

    // Jours du mois précédent
    for (let i = jourSemaine - 1; i > 0; i--) {
      joursArray.push({
        jour: dernierJourPrecedent - i + 1,
        estDansMoisActuel: false,
        estPasse: true,
        estAujourdhui: false,
      });
    }

    // Jours du mois actuel
    for (let j = 1; j <= nbJours; j++) {
      const dateJour = new Date(annee, mois, j);
      dateJour.setHours(0, 0, 0, 0);
      const estPasse = dateJour < aujourdHui;
      const estAujourdhui = dateJour.getTime() === aujourdHui.getTime();

      joursArray.push({
        jour: j,
        estDansMoisActuel: true,
        estPasse,
        estAujourdhui,
        dateObj: dateJour,
      });
    }

    // Compléter avec jours du mois suivant
    const totalCases = joursArray.length;
    const casesRestantes = totalCases % 7 === 0 ? 0 : 7 - (totalCases % 7);
    for (let k = 1; k <= casesRestantes; k++) {
      joursArray.push({
        jour: k,
        estDansMoisActuel: false,
        estPasse: false,
        estAujourdhui: false,
      });
    }

    return joursArray;
  }, []);

  // Mettre à jour l'affichage quand mois/année change
  useEffect(() => {
    const nouveauxJours = genererJoursMois(mois, annee);
    setJours(nouveauxJours);
    // Réinitialiser la sélection de date et horaire quand on change de mois
    setDateSelectionnee(null);
    setHoraireSelectionne(null);
  }, [mois, annee, genererJoursMois]);

  // Charger les horaires quand une date est sélectionnée
  useEffect(() => {
    if (!dateSelectionnee || !terrain) {
      setHoraires([]);
      return;
    }

    const { jour, mois: moisSel, annee: anneeSel } = dateSelectionnee;
    const dateStr = `${anneeSel}-${String(moisSel + 1).padStart(2, '0')}-${String(jour).padStart(2, '0')}`;
    const terrainId = String(terrain.id);

    const loadHoraires = async () => {
      const occupes = await getOccupations(terrainId, dateStr);
      const horairesAvecEtat = HORAIRES_DISPONIBLES.map((h) => ({
        ...h,
        estOccupe: occupes.includes(h.debut),
      }));
      setHoraires(horairesAvecEtat);
    };
    loadHoraires();
  }, [dateSelectionnee, terrain, getOccupations]);

  // Sélection d'un jour
  const handleSelectJour = (jour) => {
    if (jour.estPasse || !jour.estDansMoisActuel) return;
    setDateSelectionnee({
      jour: jour.jour,
      mois: mois,
      annee: annee,
    });
    setHoraireSelectionne(null);
  };

  // Sélection d'un horaire
  const handleSelectHoraire = (horaire) => {
    if (horaire.estOccupe) return;
    setHoraireSelectionne(horaire);
  };

  // Changement mois suivant/précédent
  const moisPrecedent = () => {
    if (mois === 0) {
      setMois(11);
      setAnnee(annee - 1);
    } else {
      setMois(mois - 1);
    }
  };

  const moisSuivant = () => {
    if (mois === 11) {
      setMois(0);
      setAnnee(annee + 1);
    } else {
      setMois(mois + 1);
    }
  };

  // Continuer vers la page de résumé
  const handleContinuer = () => {
    if (!dateSelectionnee || !horaireSelectionne) {
      alert('Veuillez sélectionner une date et un horaire.');
      return;
    }
    const dateStr = `${dateSelectionnee.annee}-${String(dateSelectionnee.mois + 1).padStart(2, '0')}-${String(dateSelectionnee.jour).padStart(2, '0')}`;
    navigate('/reservation', {
      state: {
        terrain,
        date: dateStr,
        heureDebut: horaireSelectionne.debut,
        heureFin: horaireSelectionne.fin,
      },
    });
  };

  // Rendu du calendrier (grid des jours)
  const renderCalendarGrid = () => {
    const joursDeSemaine = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];
    return (
      <>
        <div className="calendar-grid">
          {joursDeSemaine.map((jour) => (
            <div key={jour} className="cal-header">{jour}</div>
          ))}
        </div>
        <div className="calendar-days-container">
          {jours.map((jour, idx) => {
            let className = 'cal-day';
            if (!jour.estDansMoisActuel) className += ' other-month';
            if (jour.estPasse && jour.estDansMoisActuel) className += ' past';
            if (jour.estAujourdhui) className += ' today';
            if (dateSelectionnee && dateSelectionnee.jour === jour.jour && jour.estDansMoisActuel) className += ' selected';
            if (jour.estDansMoisActuel && !jour.estPasse) className += ' available';

            return (
              <button
                key={idx}
                className={className}
                disabled={!jour.estDansMoisActuel || jour.estPasse}
                onClick={() => handleSelectJour(jour)}
              >
                {jour.jour}
                {jour.estAujourdhui && <span className="today-dot"></span>}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  // Rendu des horaires
  const renderHoraires = () => {
    if (!dateSelectionnee) return null;
    const dateLabel = `${dateSelectionnee.jour} ${NOMS_MOIS[dateSelectionnee.mois]} ${dateSelectionnee.annee}`;
    return (
      <div className="horaires-section">
        <p className="horaires-date">
          {horaireSelectionne ? `${dateLabel} — ${horaireSelectionne.debut}` : dateLabel}
        </p>
        <div className="horaires-grid">
          {horaires.map((h, idx) => (
            <button
              key={idx}
              className={`horaire-btn ${h.estOccupe ? 'occupied' : ''} ${horaireSelectionne?.debut === h.debut ? 'selected' : ''}`}
              disabled={h.estOccupe}
              onClick={() => handleSelectHoraire(h)}
            >
              {h.debut} - {h.fin}
              {h.estOccupe && <span className="occupied-label"> Réservé</span>}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="booking-main-date">
      <div className="form-header-date">
        <button className="btn-back" onClick={() => navigate('/selection-terrain')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1>Date et heure</h1>
      </div>

      {terrain && (
        <div style={{
          background: '#f0f7ff',
          border: '1px solid #bfdbfe',
          borderRadius: 8,
          padding: '10px 16px',
          marginBottom: 16,
          fontSize: 14,
          color: '#1e40af'
        }}>
          ⚽ <strong>{terrain.nom}</strong> — {terrain.ville}
        </div>
      )}

      <div className="header-line"></div>

      <div className="calendar-section">
        <div className="calendar-controls">
          <div className="select-wrapper-cal">
            <select
              value={mois}
              onChange={(e) => setMois(parseInt(e.target.value))}
            >
              {NOMS_MOIS.map((nom, idx) => (
                <option key={idx} value={idx}>{nom}</option>
              ))}
            </select>
            <svg className="select-arrow-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <div className="select-wrapper-cal">
            <select
              value={annee}
              onChange={(e) => setAnnee(parseInt(e.target.value))}
            >
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
            </select>
            <svg className="select-arrow-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <div className="nav-arrows">
            <button className="nav-btn" onClick={moisPrecedent}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="nav-btn" onClick={moisSuivant}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        
        {renderCalendarGrid()}
      </div>

      {renderHoraires()}

      <div className="form-actions-date">
        <button className="btn-continuer-date" onClick={handleContinuer} disabled={!dateSelectionnee || !horaireSelectionne}>
          Continuer
        </button>
      </div>
    </main>
  );
}

export default DateHeure;