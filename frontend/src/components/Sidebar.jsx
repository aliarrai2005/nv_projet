import './Sidebar.css'

function Sidebar({ etapeActive }) {
  const etapes = [
    {
      id: 1,
      label: 'Sélectionnez une activité',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <path d="M8 12h8M8 8h8M8 16h5"/>
        </svg>
      )
    },
    {
      id: 2,
      label: 'Date et heure',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      )
    },
    {
      id: 3,
      label: 'Vos informations',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      )
    },
    {
      id: 4,
      label: 'Paiement',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
      )
    }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-steps">
        {etapes.map((etape, index) => {
          const isDone   = etape.id < etapeActive
          const isActive = etape.id === etapeActive

          return (
            <div key={etape.id}>
              <div className={`step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                <div className="step-icon">{etape.icon}</div>
                <span>{etape.label}</span>
                <div className={`step-dot ${isDone ? 'done-dot' : ''} ${isActive ? 'active-dot' : ''}`}>
                  {isDone && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12l5 5L20 7"/>
                    </svg>
                  )}
                </div>
              </div>
              {index < etapes.length - 1 && (
                <div className={`step-line ${isDone ? 'done-line' : ''}`}></div>
              )}
            </div>
          )
        })}
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
  )
}

export default Sidebar