// ============================================
// CALENDRIER.JS — Gestion des jours et horaires
// Avec persistance des réservations (localStorage)
// ============================================

import { getCreneauxOccupes, createReservation } from '../api/reservations.api';

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

// Terrain actif (injecté depuis DateHeure.jsx)
let terrainActif = null;
export function setTerrainActif(terrain) {
  terrainActif = terrain;
}

// Date et horaire sélectionnés (exportés pour ReservationPage)
export let selectionActuelle = {
  date: null,       // ex: "2026-06-15"
  heureDebut: null, // ex: "08:00"
  heureFin: null,   // ex: "09:00"
  terrain: null,
};

// -----------------------------------------------
// FONCTION : formate une date en "YYYY-MM-DD"
// -----------------------------------------------
function formaterDate(jour, mois, annee) {
  const mm = String(mois + 1).padStart(2, '0');
  const jj = String(jour).padStart(2, '0');
  return `${annee}-${mm}-${jj}`;
}

// -----------------------------------------------
// FONCTION PRINCIPALE : génère les jours du mois
// -----------------------------------------------
export function genererJours(mois, annee) {
  const conteneur = document.getElementById('calendar-days');
  if (!conteneur) return;
  conteneur.innerHTML = '';

  const aujourd_hui = new Date();
  aujourd_hui.setHours(0, 0, 0, 0);

  const premierJour = new Date(annee, mois, 1);
  let jourSemaine = premierJour.getDay();
  if (jourSemaine === 0) jourSemaine = 7;

  const dernierJourPrecedent = new Date(annee, mois, 0).getDate();
  const nbJours = new Date(annee, mois + 1, 0).getDate();

  // Jours mois précédent
  for (let i = jourSemaine - 1; i > 0; i--) {
    const btn = document.createElement('button');
    btn.className = 'cal-day other-month';
    btn.textContent = dernierJourPrecedent - i + 1;
    btn.disabled = true;
    conteneur.appendChild(btn);
  }

  // Jours du mois actuel
  for (let j = 1; j <= nbJours; j++) {
    const dateJour = new Date(annee, mois, j);
    dateJour.setHours(0, 0, 0, 0);
    const btn = document.createElement('button');
    btn.textContent = j;

    if (dateJour < aujourd_hui) {
      btn.className = 'cal-day past';
      btn.disabled = true;
    } else if (dateJour.getTime() === aujourd_hui.getTime()) {
      btn.className = 'cal-day today';
      btn.disabled = true;
      const dot = document.createElement('span');
      dot.className = 'today-dot';
      btn.appendChild(dot);
    } else {
      btn.className = 'cal-day available';
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cal-day.selected').forEach(el => {
          el.classList.remove('selected');
        });
        btn.classList.add('selected');
        afficherHoraires(j, mois, annee);
      });
    }

    conteneur.appendChild(btn);
  }

  // Jours mois suivant
  const totalCases = conteneur.children.length;
  const casesRestantes = totalCases % 7 === 0 ? 0 : 7 - (totalCases % 7);
  for (let k = 1; k <= casesRestantes; k++) {
    const btn = document.createElement('button');
    btn.className = 'cal-day other-month';
    btn.textContent = k;
    btn.disabled = true;
    conteneur.appendChild(btn);
  }
}

// -----------------------------------------------
// FONCTION : affiche les horaires avec créneaux occupés
// -----------------------------------------------
function afficherHoraires(jour, mois, annee) {
  const section = document.getElementById('horaires-section');
  const dateLabel = document.getElementById('horaires-date');
  const grid = document.getElementById('horaires-grid');
  if (!section || !dateLabel || !grid) return;

  const nomsMois = [
    'janvier','février','mars','avril','mai','juin',
    'juillet','août','septembre','octobre','novembre','décembre'
  ];

  const dateStr = formaterDate(jour, mois, annee);
  const terrainId = terrainActif ? String(terrainActif.id) : 'default';

  // Récupérer les créneaux déjà réservés depuis localStorage
  const creneauxOccupes = getCreneauxOccupes(terrainId, dateStr);

  dateLabel.textContent = `${jour} ${nomsMois[mois]} ${annee}`;
  grid.innerHTML = '';

  // Réinitialiser la sélection en cours
  selectionActuelle.date = dateStr;
  selectionActuelle.heureDebut = null;
  selectionActuelle.heureFin = null;
  selectionActuelle.terrain = terrainActif;

  HORAIRES_DISPONIBLES.forEach(({ debut, fin }) => {
    const btn = document.createElement('button');
    const estOccupe = creneauxOccupes.includes(debut);

    if (estOccupe) {
      // Créneau déjà réservé — grisé, non cliquable
      btn.className = 'horaire-btn occupied';
      btn.innerHTML = `${debut} - ${fin}<span class="occupied-label"> Réservé</span>`;
      btn.disabled = true;
    } else {
      btn.className = 'horaire-btn';
      btn.textContent = `${debut} - ${fin}`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.horaire-btn.selected').forEach(el => {
          el.classList.remove('selected');
        });
        btn.classList.add('selected');
        dateLabel.textContent = `${jour} ${nomsMois[mois]} ${annee} — ${debut}`;

        // Sauvegarder la sélection actuelle
        selectionActuelle.heureDebut = debut;
        selectionActuelle.heureFin = fin;

        // Sauvegarder dans sessionStorage pour ReservationPage
        sessionStorage.setItem('reservation_en_cours', JSON.stringify({
          terrainId,
          terrainNom: terrainActif?.nom || 'Terrain',
          date: dateStr,
          heureDebut: debut,
          heureFin: fin,
        }));
      });
    }

    grid.appendChild(btn);
  });

  section.classList.remove('hidden');
}

// -----------------------------------------------
// FONCTION : confirmer et sauvegarder la réservation
// -----------------------------------------------
export function confirmerReservation(infoClient = {}) {
  if (!selectionActuelle.date || !selectionActuelle.heureDebut) {
    alert('Veuillez sélectionner une date et un horaire.');
    return null;
  }
  const reservation = createReservation({
    terrainId: String(terrainActif?.id || 'default'),
    terrainNom: terrainActif?.nom || 'Terrain',
    date: selectionActuelle.date,
    heureDebut: selectionActuelle.heureDebut,
    heureFin: selectionActuelle.heureFin,
    ...infoClient,
  });
  return reservation;
}

// -----------------------------------------------
// INITIALISATION
// -----------------------------------------------
export function initCalendrier() {
  const selectMois = document.getElementById('select-mois');
  const selectAnnee = document.getElementById('select-annee');
  const btnPrev = document.getElementById('prev-month');
  const btnNext = document.getElementById('next-month');

  if (!selectMois || !selectAnnee) return;

  genererJours(parseInt(selectMois.value), parseInt(selectAnnee.value));

  selectMois.addEventListener('change', () => {
    document.getElementById('horaires-section')?.classList.add('hidden');
    genererJours(parseInt(selectMois.value), parseInt(selectAnnee.value));
  });

  selectAnnee.addEventListener('change', () => {
    document.getElementById('horaires-section')?.classList.add('hidden');
    genererJours(parseInt(selectMois.value), parseInt(selectAnnee.value));
  });

  btnPrev?.addEventListener('click', () => {
    let m = parseInt(selectMois.value);
    let a = parseInt(selectAnnee.value);
    if (m === 0) { m = 11; a--; } else { m--; }
    selectMois.value = m;
    selectAnnee.value = a;
    document.getElementById('horaires-section')?.classList.add('hidden');
    genererJours(m, a);
  });

  btnNext?.addEventListener('click', () => {
    let m = parseInt(selectMois.value);
    let a = parseInt(selectAnnee.value);
    if (m === 11) { m = 0; a++; } else { m++; }
    selectMois.value = m;
    selectAnnee.value = a;
    document.getElementById('horaires-section')?.classList.add('hidden');
    genererJours(m, a);
  });
}
