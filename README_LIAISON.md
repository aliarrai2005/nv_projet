# 🔗 Liaison Backend (NestJS) ↔ Frontend (React + Vite)

## Architecture

```
Frontend React (Vite)           Backend NestJS
Port: 5173                       Port: 3001
        │                               │
        │  GET /api/stades              │
        │──────────────────────────────▶│ StadesController
        │                               │   └─ StadesService
        │  GET /api/stades/:ville       │       └─ OverpassService (OSM)
        │──────────────────────────────▶│
        │                               │
        │  GET /api/football-pitches    │
        │──────────────────────────────▶│ FootballPitchController
        │◀──────────────────────────────│   └─ FootballPitchService
        │         JSON response         │
```

## 🚀 Démarrage

### 1. Backend NestJS
```bash
cd backend
npm install
npm run start:dev
# → http://localhost:3001
```

### 2. Frontend React
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## 📁 Fichiers modifiés / créés

### Backend
| Fichier | Modification |
|---------|-------------|
| `src/main.ts` | CORS activé pour `http://localhost:5173`, préfixe `/api`, port `3001` |
| `src/app.module.ts` | Import des 3 modules : `StadesModule`, `FootballPitchModule`, `OverpassModule` |

### Frontend
| Fichier | Description |
|---------|-------------|
| `.env` | `VITE_API_URL=http://localhost:3001/api` |
| `vite.config.js` | Proxy `/api` → `http://localhost:3001` |
| `src/api/axiosConfig.js` | Instance Axios centralisée |
| `src/api/stades.api.js` | Fonctions : `getAllStades()`, `getStadesByVille(ville)` |
| `src/api/footballPitch.api.js` | Fonction : `getFootballPitches()` |
| `src/hooks/useTerrains.js` | Hook React pour charger tous les terrains |
| `src/hooks/useTerrainsByVille.js` | Hook React pour une ville précise |
| `src/components/SelectActivite2.jsx` | **Connecté au backend** — chargement réel des terrains |
| `package.json` | Ajout de la dépendance `axios` |

## 🔌 Routes API disponibles

| Méthode | URL | Description |
|---------|-----|-------------|
| `GET` | `/api/stades` | Tous les terrains par ville (objet `{casablanca: [...], ...}`) |
| `GET` | `/api/stades/:ville` | Terrains d'une ville (`casablanca`, `rabat`, `fes`, `marrakesh`, `tanger`) |
| `GET` | `/api/football-pitches` | Terrains foot via Overpass (format OSM brut) |

## 💡 Utilisation dans un composant

```jsx
import { useTerrains } from '../hooks/useTerrains'

function MonComposant() {
  const { terrains, loading, error } = useTerrains()

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error}</p>

  return <ul>{terrains.map(t => <li key={t.id}>{t.nom}</li>)}</ul>
}
```

## ⚠️ Notes importantes

- Le backend appelle l'**API Overpass (OpenStreetMap)** — les premières requêtes peuvent être lentes (30s)
- Un **cache de 6h** est activé côté NestJS (`CacheModule`)
- En cas d'erreur backend, `SelectActivite2.jsx` affiche des données de secours
