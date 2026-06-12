const moodMeta = {
  Happy: { emoji: '😊', tone: 'You are carrying positive energy today. Keep it going with gentle consistency.' },
  Sad: { emoji: '😔', tone: 'It is okay to have hard days. Small, kind steps can make a big difference.' },
  Neutral: { emoji: '😌', tone: 'A calm day is valuable too. Use this balance to recharge your mind.' },
  Stressed: { emoji: '😣', tone: 'You are handling a lot right now. Pause, breathe, and focus on one task at a time.' },
}

function InsightsScreen({ studentName, selectedMood, onContinue }) {
  const meta = moodMeta[selectedMood] ?? moodMeta.Neutral

  return (
    <section className="card screen-enter" aria-labelledby="insights-title">
      <h2 id="insights-title">Your Insights</h2>
      <p className="subtitle">
        {studentName ? `${studentName}, h` : 'H'}ere’s a simple snapshot from today’s check-in.
      </p>

      <div className="insights-layout">
        <article className="mood-insight-card">
          <p className="insight-kicker">Current mood</p>
          <p className="insight-mood">
            <span className="insight-emoji" aria-hidden="true">{meta.emoji}</span> {selectedMood}
          </p>
          <p className="insight-text">{meta.tone}</p>
        </article>

        <article className="mini-visual-card" aria-label="Weekly check-in summary">
          <p className="insight-kicker">Weekly rhythm</p>
          <div className="mini-ring">
            <div className="mini-ring-inner">4 / 7</div>
          </div>
          <p className="insight-text">You checked in 4 days this week. Great consistency!</p>
        </article>
      </div>

      <button type="button" className="button button-primary button-glow" onClick={onContinue}>
        Continue to Mini Wellness Activity
      </button>
    </section>
  )
}

export default InsightsScreen
