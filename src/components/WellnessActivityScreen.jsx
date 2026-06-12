const activities = [
  {
    title: 'Breathing Reset',
    text: 'Inhale for 4 seconds, hold for 4, exhale for 6. Repeat 4 rounds.',
    emoji: '🌬️',
  },
  {
    title: 'Hydration Reminder',
    text: 'Take a few sips of water to help your focus and energy.',
    emoji: '💧',
  },
  {
    title: 'Positive Affirmation',
    text: '“I can move forward one small step at a time.”',
    emoji: '✨',
  },
  {
    title: 'Calming Tip',
    text: 'Step away from screens for 5 minutes and relax your shoulders.',
    emoji: '🧘',
  },
]

function WellnessActivityScreen({ onStartNew }) {
  return (
    <section className="card screen-enter" aria-labelledby="wellness-title">
      <h2 id="wellness-title">Mini Wellness Activity</h2>
      <p className="subtitle">A quick reset before you continue your day.</p>

      <div className="wellness-illustration" aria-hidden="true">
        <span>🌿</span>
        <span>☁️</span>
        <span>🫧</span>
      </div>

      <div className="activity-grid">
        {activities.map((activity) => (
          <article key={activity.title} className="activity-card">
            <p className="activity-title">
              <span aria-hidden="true">{activity.emoji}</span> {activity.title}
            </p>
            <p className="activity-text">{activity.text}</p>
          </article>
        ))}
      </div>

      <div className="wellness-progress" aria-label="Wellness progress circle">
        <div className="wellness-ring">
          <div className="wellness-ring-inner">100%</div>
        </div>
        <p className="subtitle">Great job completing today’s wellness mini activity.</p>
      </div>

      <button type="button" className="button button-primary button-glow" onClick={onStartNew}>
        Start New Check-In
      </button>
    </section>
  )
}

export default WellnessActivityScreen
