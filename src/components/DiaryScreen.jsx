import { useMemo, useState } from 'react'
import moods from '../data/moods'

function DiaryScreen({ entries = [], onUpdateEntry, onDeleteEntry, onReturn }) {
  const [search, setSearch] = useState('')
  const [filterMood, setFilterMood] = useState('All')
  const [expandedId, setExpandedId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editMood, setEditMood] = useState('Happy')
  const [editJournal, setEditJournal] = useState('')
  const [actionMessage, setActionMessage] = useState('')

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesMood = filterMood === 'All' || entry.mood === filterMood
      const text = `${entry.journal_entry || ''}`.toLowerCase()
      const matchesSearch = search.trim().length === 0 || text.includes(search.toLowerCase())
      return matchesMood && matchesSearch
    })
  }, [entries, filterMood, search])

  const beginEdit = (entry) => {
    setEditingId(entry.id)
    setEditMood(entry.mood || 'Happy')
    setEditJournal(entry.journal_entry || '')
    setExpandedId(entry.id)
    setActionMessage('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setActionMessage('')
  }

  const handleSave = async (id) => {
    const success = await onUpdateEntry(id, {
      mood: editMood,
      journal_entry: editJournal.trim(),
    })

    if (success) {
      setActionMessage('Journal entry updated')
      setEditingId(null)
    } else {
      setActionMessage('Unable to save changes. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this journal entry? This cannot be undone.')
    if (!confirmed) return

    const success = await onDeleteEntry(id)
    if (success) {
      setActionMessage('Journal entry deleted')
      if (expandedId === id) setExpandedId(null)
    } else {
      setActionMessage('Unable to delete entry. Please try again.')
    }
  }

  const handleViewDetails = (id) => {
    setExpandedId((current) => (current === id ? null : id))
    setEditingId(null)
  }

  return (
    <section className="card diary-card" aria-labelledby="diary-title">
      <div className="diary-header">
        <div>
          <h2 id="diary-title">My Journal</h2>
          <p className="subtitle">Review, search, edit, and manage your mood entries.</p>
        </div>
        <button type="button" className="button button-secondary" onClick={onReturn}>
          Back to Dashboard
        </button>
      </div>

      <div className="diary-controls">
        <label className="label">
          Search entries
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input"
            placeholder="Search mood notes..."
          />
        </label>

        <label className="label">
          Filter by mood
          <select value={filterMood} onChange={(event) => setFilterMood(event.target.value)} className="input">
            <option value="All">All moods</option>
            {moods.map((mood) => (
              <option key={mood.label} value={mood.label}>
                {mood.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {actionMessage ? <p className="action-message">{actionMessage}</p> : null}

      {filteredEntries.length > 0 ? (
        <div className="diary-grid">
          {filteredEntries.map((entry) => {
            const entryDate = entry.created_at ? new Date(entry.created_at) : null
            const isExpanded = expandedId === entry.id
            const isEditing = editingId === entry.id

            return (
              <article key={entry.id} className="diary-entry-card">
                <div className="entry-summary">
                  <div>
                    <p className="entry-mood">{entry.mood}</p>
                    <p className="entry-date">
                      {entryDate ? entryDate.toLocaleString() : 'No date available'}
                    </p>
                  </div>
                  <div className="entry-actions">
                    <button type="button" className="button button-secondary" onClick={() => handleViewDetails(entry.id)}>
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </button>
                    <button type="button" className="button button-secondary" onClick={() => beginEdit(entry)}>
                      Edit
                    </button>
                    <button type="button" className="button button-secondary" onClick={() => handleDelete(entry.id)}>
                      Delete
                    </button>
                  </div>
                </div>

                {isExpanded && !isEditing && (
                  <div className="entry-details">
                    <p>{entry.journal_entry || 'No journal entry was added for this mood.'}</p>
                  </div>
                )}

                {isEditing && (
                  <form className="entry-edit-form" onSubmit={(event) => { event.preventDefault(); handleSave(entry.id) }}>
                    <label className="label">
                      Mood
                      <select value={editMood} onChange={(event) => setEditMood(event.target.value)} className="input">
                        {moods.map((mood) => (
                          <option key={mood.label} value={mood.label}>
                            {mood.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="label">
                      Journal entry
                      <textarea
                        value={editJournal}
                        onChange={(event) => setEditJournal(event.target.value)}
                        className="textarea"
                        rows={4}
                        placeholder="Update your reflection"
                      />
                    </label>
                    <div className="button-row">
                      <button type="button" className="button button-secondary" onClick={cancelEdit}>
                        Cancel
                      </button>
                      <button type="submit" className="button button-primary">
                        Save changes
                      </button>
                    </div>
                  </form>
                )}

                {!isExpanded && !isEditing && (
                  <p className="entry-preview">
                    {entry.journal_entry ? entry.journal_entry.slice(0, 120) + (entry.journal_entry.length > 120 ? '...' : '') : 'No reflection text added.'}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <p className="muted">No journal entries found. Complete a check-in to start your diary.</p>
      )}
    </section>
  )
}

export default DiaryScreen
