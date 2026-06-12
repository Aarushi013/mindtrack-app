function PrivacyScreen({ onClose }) {
  return (
    <section className="card" aria-labelledby="privacy-title">
      <h2 id="privacy-title">Privacy & Data</h2>
      <p className="subtitle">How your data is used and stored.</p>

      <article>
        <h3>Data storage</h3>
        <p className="muted">Your mood check-ins and journal entries are stored in a Supabase database linked to your account. Only you can access your saved entries when signed in.</p>

        <h3>Not medical advice</h3>
        <p className="muted">MindTrack is a student wellbeing tool and not a substitute for professional mental health services. If you are in crisis, contact local emergency services or university support.</p>

        <h3>Responsible use</h3>
        <p className="muted">Keep your account secure and consider what personal details you include in journal entries.</p>
      </article>

      <div className="button-row">
        <button className="button button-primary" onClick={onClose}>Close</button>
      </div>
    </section>
  )
}

export default PrivacyScreen
