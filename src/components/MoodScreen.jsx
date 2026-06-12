import moods from '../data/moods'

function MoodScreen({ studentName, selectedMood, onBack, onContinue }) {
  return (
    <section className="card screen-enter" aria-labelledby="mood-title">
      <h2 id="mood-title">
        {studentName ? `${studentName}, how are you feeling today?` : 'How are you feeling today?'}
      </h2>
      <p className="subtitle">Choose the mood that best matches your current state.</p>

      <div className="mood-grid" role="list" aria-label="Mood options">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.label

          return (
            <button
              key={mood.label}
              type="button"
              role="listitem"
              className={`mood-button ${mood.theme} ${isSelected ? 'mood-button-selected' : ''}`}
              onClick={() => onContinue(mood.label)}
            >
              <span className="mood-emoji" aria-hidden="true">
                {mood.emoji}
              </span>
              <span>{mood.label}</span>
            </button>
          )
        })}
      </div>

      <div className="button-row">
        <button type="button" className="button button-secondary" onClick={onBack}>
          Back
        </button>
      </div>
    </section>
  )
}

export default MoodScreen
