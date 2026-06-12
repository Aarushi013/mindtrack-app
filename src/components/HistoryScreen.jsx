function HistoryScreen({ entries }) {
  return (
    <section className="card" aria-labelledby="history-title">
      <h2 id="history-title">Check-in History</h2>
      <p className="subtitle">Your recent mood entries.</p>

      {entries?.length ? (
        <ul className="history-list">
          {entries.map((e) => (
            <li key={e.id} className="history-item">
              <div className="history-meta">
                <strong>{e.mood}</strong>
                <span className="muted">{e.created_at ? new Date(e.created_at).toLocaleString() : `id:${e.id}`}</span>
              </div>
              {e.journal_entry ? <p className="history-note">{e.journal_entry}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">No entries yet. Start a check-in to save your mood history.</p>
      )}
    </section>
  )
}

export default HistoryScreen
