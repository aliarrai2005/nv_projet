import './SelectActivite.css'
import { useNavigate } from 'react-router-dom'

function SelectActivite() {
  const navigate = useNavigate()

  return (
    <main className="booking-main">
      <div className="form-header">
        <h1>Sélectionnez une activité</h1>
        <div className="header-line"></div>
      </div>

      <form className="booking-form" onSubmit={(e) => { e.preventDefault(); navigate('/date-heure') }}>
        <div className="form-group">
          <label htmlFor="activite">
            <span className="required">*</span> Activité :
          </label>
          <div className="select-wrapper">
            <select id="activite" name="activite" required defaultValue="">
              <option value="" disabled>Sélection d'activités</option>
              <option value="football">Football</option>
              <option value="tennis">Tennis</option>
              <option value="basketball">Basketball</option>
              <option value="natation">Natation</option>
              <option value="fitness">Fitness</option>
            </select>
            <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="terrain">Terrain :</label>
          <div className="select-wrapper">
            <select id="terrain" name="terrain" defaultValue="">
              <option value="" disabled>Sélection du terrain</option>
              <option value="terrain-1">Terrain 1</option>
              <option value="terrain-2">Terrain 2</option>
              <option value="terrain-3">Terrain 3</option>
            </select>
            <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-continuer">Continuer</button>
        </div>
      </form>
    </main>
  )
}

export default SelectActivite