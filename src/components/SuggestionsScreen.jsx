import suggestionsByMood from '../data/suggestions'

function SuggestionsScreen({ studentName, selectedMood, journalEntry, onContinue }) {
  const suggestions = suggestionsByMood[selectedMood] ?? suggestionsByMood.Neutral

  return (
    <section className="card screen-enter" aria-labelledby="suggestions-title">
      <h2 id="suggestions-title">Check-in complete ✅</h2>
      <p className="subtitle">
        {studentName ? `Thanks for sharing, ${studentName}.` : 'Thanks for sharing.'} Based on your
        mood, here are some wellbeing suggestions.
      </p>

      <div className="summary">
        <p>
          <strong>Mood:</strong> {selectedMood}
        </p>
        <p>
          <strong>Your reflection:</strong> {journalEntry || 'No journal entry provided.'}
        </p>
      </div>

      <ul className="suggestions-list">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>

      <div className="button-row">
        <button type="button" className="button button-primary button-glow" onClick={onContinue}>
          Continue to Insights
        </button>
      </div>
    </section>
  )
}

export default SuggestionsScreen
