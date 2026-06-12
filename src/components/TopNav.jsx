function TopNav({ user, onLogout, onNavigate, showActions }) {
  return (
    <nav className="top-nav" aria-label="Main navigation">
      <div className="brand">
        <span className="brand-badge" aria-hidden="true">
          🌿
        </span>
        <div>
          <p className="brand-title">MindTrack</p>
          <p className="brand-subtitle">Student Wellbeing</p>
        </div>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <button type="button" className="button button-secondary nav-button" onClick={() => onNavigate('diary')}>
              Diary
            </button>
            <button type="button" className="button button-secondary nav-button" onClick={() => onNavigate('privacy')}>
              Privacy
            </button>
            <button type="button" className="button button-secondary nav-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          showActions ? (
            <>
              <button type="button" className="button button-secondary nav-button" onClick={() => onNavigate('auth')}>
                Login
              </button>
              <button type="button" className="button button-secondary nav-button" onClick={() => onNavigate('privacy')}>
                About
              </button>
            </>
          ) : null
        )}
      </div>
    </nav>
  )
}

export default TopNav
