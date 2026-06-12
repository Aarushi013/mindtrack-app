import { useState } from 'react'

function JournalScreen({ studentName, selectedMood, initialEntry, onBack, onContinue }) {
  const [entry, setEntry] = useState(initialEntry ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()
    onContinue(entry)
  }

  return (
    <section className="card" aria-labelledby="journal-title">
      <h2 id="journal-title">Reflect on your day</h2>
      <p className="subtitle">
        {studentName ? `${studentName}, ` : ''}
        you selected <strong>{selectedMood}</strong>. Write a few thoughts about your day.
      </p>

      <form onSubmit={handleSubmit} className="form-stack">
        <label htmlFor="journalEntry" className="label">
          Journal entry
        </label>
        <textarea
          id="journalEntry"
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          className="textarea"
          rows={6}
          placeholder="Today I felt..."
        />

        <div className="button-row">
          <button type="button" className="button button-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="button button-primary">
            See Suggestions
          </button>
        </div>
      </form>
    </section>
  )
}

export default JournalScreen
