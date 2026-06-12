const moodMeta = {
  Happy: { emoji: '😊', tone: 'You are carrying positive energy today. Keep it going with gentle consistency.' },
  Sad: { emoji: '😔', tone: 'It is okay to have hard days. Small, kind steps can make a big difference.' },
  Neutral: { emoji: '😌', tone: 'A calm day is valuable too. Use this balance to recharge your mind.' },
  Stressed: { emoji: '😣', tone: 'You are handling a lot right now. Pause, breathe, and focus on one task at a time.' },
}

function InsightsScreen({ studentName, selectedMood, entries = [], onContinue }) {
  const meta = moodMeta[selectedMood] ?? moodMeta.Neutral

  const total = entries.length
  const distribution = entries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1
    return acc
  }, {})

  const recent = entries.slice(0, 5)

  return (
    <section className="card screen-enter" aria-labelledby="insights-title">
      <h2 id="insights-title">Your Insights</h2>
      <p className="subtitle">
        {studentName ? `${studentName}, ` : ''}here’s a snapshot from your recent check-ins.
      </p>

      <div className="insights-layout">
        <article className="mood-insight-card">
          <p className="insight-kicker">Current mood</p>
          <p className="insight-mood">
            <span className="insight-emoji" aria-hidden="true">{meta.emoji}</span> {selectedMood}
          </p>
          <p className="insight-text">{meta.tone}</p>
        </article>

        <article className="mini-visual-card" aria-label="Summary stats">
          <p className="insight-kicker">Total entries</p>
          <div className="mini-ring">
            <div className="mini-ring-inner">{total}</div>
          </div>
          <p className="insight-text">A quick look at your saved check-ins.</p>
        </article>
      </div>

      <div className="distribution">
        <h4>Mood distribution</h4>
        <ul className="distribution-list">
          {Object.keys(distribution).length ? (
            Object.entries(distribution).map(([mood, count]) => (
              <li key={mood}>{mood}: {count}</li>
            ))
          ) : (
            <li className="muted">No saved entries yet.</li>
          )}
        </ul>
      </div>

      <div className="recent-entries">
        <h4>Recent moods</h4>
        <ul>
          {recent.length ? recent.map((r) => (
            <li key={r.id}>{r.mood} — {r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}</li>
          )) : <li className="muted">No recent entries</li>}
        </ul>
      </div>

      <button type="button" className="button button-primary button-glow" onClick={onContinue}>
        Continue to Mini Wellness Activity
      </button>
    </section>
  )
}

export default InsightsScreen
