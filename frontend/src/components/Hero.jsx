import '../components/Hero.css'

function Home() {
  return (
    <div className="booking-wrapper">

      <aside className="sidebar">
        <div className="sidebar-steps">

          <div className="step active">
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M8 12h8M8 8h8M8 16h5"/>
              </svg>
            </div>
            <span>Sélectionnez une activité</span>
            <div className="step-dot active-dot"></div>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <span>Date et heure</span>
            <div className="step-dot"></div>
          </div>

          <div className="step-line"></div>

          <div className="step">
            <div className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <span>Vos informations</span>
            <div className="step-dot"></div>
          </div>

        </div>

        <div className="sidebar-contact">
          <p className="contact-label">Prenez contact</p>
          <p>+212632251552</p>
          <p>contact@adesl-bernoussi.ma</p>
        </div>

        <button className="sidebar-toggle">
          Réduire le menu
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </aside>

      <main className="booking-main">
        <div className="form-header">
          <h1>Sélectionnez une activité</h1>
          <div className="header-line"></div>
        </div>

        <form className="booking-form">
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

    </div>
  )
}

export default Home