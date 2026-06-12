import { useState } from 'react'
import { supabase } from '../supabase'

function AuthScreen({ onAuth }) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }

      const { data: { user } = {} } = await supabase.auth.getUser()
      onAuth(user ?? null)
    } catch (err) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-screen card">
      <h2>{isSignup ? 'Create account' : 'Log in'}</h2>
      <p className="subtitle">Sign in to save your check-ins and see personalized insights.</p>

      <form className="form-stack" onSubmit={handleSubmit}>
        <label className="label">Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error ? <p className="error-text">{error}</p> : null}

        <div className="button-row">
          <button className="button button-secondary" type="button" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Have an account? Log in' : "Don't have an account? Sign up"}
          </button>
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default AuthScreen
