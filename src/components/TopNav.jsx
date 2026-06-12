function TopNav({ showActions }) {
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

      {showActions ? (
        <div className="nav-actions">
          <button type="button" className="button button-secondary nav-button">
            Login
          </button>
          <button type="button" className="button button-secondary nav-button">
            Help
          </button>
          <button type="button" className="button button-secondary nav-button">
            About
          </button>
        </div>
      ) : null}
    </nav>
  )
}

export default TopNav
