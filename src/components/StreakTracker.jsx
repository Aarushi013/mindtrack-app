function StreakTracker({ entries = [] }) {
  const computeStreak = (items) => {
    if (!items.length) return 0

    const dates = items
      .map((e) => e.created_at && new Date(e.created_at).toISOString().slice(0, 10))
      .filter(Boolean)

    const unique = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a))

    let streak = 0
    let lastDate = null

    for (const d of unique) {
      if (!lastDate) {
        streak = 1
        lastDate = new Date(d)
        continue
      }

      const prev = new Date(d)
      const diffDays = Math.round((lastDate - prev) / (1000 * 60 * 60 * 24))
      if (diffDays === 1) {
        streak += 1
        lastDate = prev
      } else break
    }

    return streak
  }

  const streak = computeStreak(entries)

  return (
    <section className="streak-card" aria-label="Check-in streak">
      <p className="streak-title">🔥 Streak Tracker</p>
      <p className="streak-text">You checked in {streak} day{streak === 1 ? '' : 's'} in a row!</p>
    </section>
  )
}

export default StreakTracker

