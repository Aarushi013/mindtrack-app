import { useState } from 'react'
import dailyQuotes from '../data/quotes'

function WelcomeScreen({ onContinue }) {
  const [name, setName] = useState('')
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * dailyQuotes.length)
    return dailyQuotes[randomIndex]
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    onContinue(name)
  }

  return (
    <section className="card screen-enter" aria-labelledby="welcome-title">
      <h2 id="welcome-title">Welcome 👋</h2>
      <p className="subtitle">
        MindTrack helps you do a quick emotional check-in and reflect on your day.
      </p>

      <article className="quote-card" aria-label="Daily motivational quote">
        <p className="quote-label">Daily quote</p>
        <p className="quote-text">“{quote}”</p>
      </article>

      <form onSubmit={handleSubmit} className="form-stack">
        <label htmlFor="studentName" className="label">
          Your name (optional)
        </label>
        <input
          id="studentName"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Alex"
          className="input"
        />

        <button type="submit" className="button button-primary">
          Start Check-In
        </button>
      </form>
    </section>
  )
}

export default WelcomeScreen
