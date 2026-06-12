import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import MoodScreen from './components/MoodScreen'
import JournalScreen from './components/JournalScreen'
import SuggestionsScreen from './components/SuggestionsScreen'
import InsightsScreen from './components/InsightsScreen'
import ProgressIndicator from './components/ProgressIndicator'
import WellnessActivityScreen from './components/WellnessActivityScreen'
import StreakTracker from './components/StreakTracker'
import TopNav from './components/TopNav'
import AppFooter from './components/AppFooter'
import { moodThemeByLabel } from './data/moods'
import './App.css'
import { supabase } from './supabase'
import AuthScreen from './components/AuthScreen'
import DiaryScreen from './components/DiaryScreen'
import PrivacyScreen from './components/PrivacyScreen'

function App() {
  console.log('Supabase connected:', supabase)                                                 
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [studentName, setStudentName] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [journalEntry, setJournalEntry] = useState('')
  const [user, setUser] = useState(null)
  const [entries, setEntries] = useState([])
  console.log('CURRENT SCREEN:', currentScreen)

  const startCheckIn = (name) => {
    setStudentName(name.trim())
    setCurrentScreen('mood')
  }

  const goToJournal = (mood) => {
    setSelectedMood(mood)
    setCurrentScreen('journal')
  }

 const completeJournal = async (entry) => {
  const cleanedEntry = entry.trim()

  const payload = {
    mood: selectedMood,
    journal_entry: cleanedEntry,
  }

  if (user?.id) payload.user_id = user.id

  const { data, error } = await supabase.from('mood_entries').insert([payload])

  if (error) {
    console.error('Supabase error:', error)
  } else {
    console.log('Saved successfully:', data)
  }

  setJournalEntry(cleanedEntry)
  setCurrentScreen('suggestions')
  // refresh entries for insights/history
  fetchEntries()
  }


  const fetchEntries = async () => {
    if (!user?.id) return

    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch entries', error)
      return
    }

    setEntries(data ?? [])
  }
  const goToInsights = () => {
    setCurrentScreen('insights')
  }

  const goToWellnessActivity = () => {
    setCurrentScreen('wellness')
  }

  const updateEntry = async (id, updates) => {
    if (!user?.id) return false

    const { error } = await supabase
      .from('mood_entries')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Failed to update entry', error)
      return false
    }

    await fetchEntries()
    return true
  }

  const deleteEntry = async (id) => {
    if (!user?.id) return false

    const { error } = await supabase
      .from('mood_entries')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Failed to delete entry', error)
      return false
    }

    await fetchEntries()
    return true
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setEntries([])
    setCurrentScreen('auth')
  }

  // handle auth state
  useEffect(() => {
    let mounted = true

    const init = async () => {
      const {
        data: { user: currentUser }
      } = await supabase.auth.getUser()

      if (!mounted) return
      setUser(currentUser ?? null)

      if (currentUser) {
        fetchEntries()
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) fetchEntries()
      if (!u) setEntries([])
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe?.()
    }
  }, [])

  const resetCheckIn = () => {
    setCurrentScreen('welcome')
    setStudentName('')
    setSelectedMood('')
    setJournalEntry('')
  }

  const progressSteps = {
    welcome: 1,
    mood: 2,
    journal: 3,
    suggestions: 4,
    insights: 5,
    wellness: 6,
  }

  const totalSteps = 6
  const moodThemeClass = moodThemeByLabel[selectedMood] ?? 'theme-neutral'
  const isWelcomeScreen = currentScreen === 'welcome'
  const screenClass = `screen-${currentScreen}`
  const currentProgressStep = progressSteps[currentScreen] ?? 0

  const renderScreen = () => {
    // Auth screen route
    if (currentScreen === 'auth') {
      return <AuthScreen onAuth={(u) => { setUser(u); if (u) setCurrentScreen('welcome') }} />
    }

    // if user is not signed in, show auth screen
    if (!user) {
      return <AuthScreen onAuth={(u) => { setUser(u); if (u) setCurrentScreen('welcome') }} />
    }

    if (currentScreen === 'welcome') {
      return <WelcomeScreen onContinue={startCheckIn} />
    }

    if (currentScreen === 'mood') {
      return (
        <MoodScreen
          studentName={studentName}
          selectedMood={selectedMood}
          onBack={() => setCurrentScreen('welcome')}
          onContinue={goToJournal}
        />
      )
    }

    if (currentScreen === 'journal') {
      return (
        <JournalScreen
          studentName={studentName}
          selectedMood={selectedMood}
          initialEntry={journalEntry}
          onBack={() => setCurrentScreen('mood')}
          onContinue={completeJournal}
        />
      )
    }

    if (currentScreen === 'suggestions') {
      return (
        <SuggestionsScreen
          studentName={studentName}
          selectedMood={selectedMood}
          journalEntry={journalEntry}
          onContinue={goToInsights}
        />
      )
    }

    if (currentScreen === 'insights') {
      return (
        <InsightsScreen
          studentName={studentName}
          selectedMood={selectedMood}
          entries={entries}
          onContinue={goToWellnessActivity}
        />
      )
    }

    if (currentScreen === 'diary' || currentScreen === 'history') {
      return (
        <DiaryScreen
          entries={entries}
          onUpdateEntry={updateEntry}
          onDeleteEntry={deleteEntry}
          onReturn={() => setCurrentScreen('welcome')}
        />
      )
    }

    if (currentScreen === 'privacy') {
      return <PrivacyScreen onClose={() => setCurrentScreen('welcome')} />
    }

    return (
      <WellnessActivityScreen onStartNew={resetCheckIn} />
    )
  }

  return (
    <div className={`app-shell ${moodThemeClass} ${screenClass} ${isWelcomeScreen ? 'welcome-mode' : ''}`}>
      <div className="bg-blob blob-1" aria-hidden="true"></div>
      <div className="bg-blob blob-2" aria-hidden="true"></div>
      <div className="bg-blob blob-3" aria-hidden="true"></div>

      <TopNav user={user} onLogout={handleLogout} onNavigate={(s) => setCurrentScreen(s)} showActions={isWelcomeScreen} />

      <main className="content-wrap">
        <header className="app-header screen-enter">
          <h1>MindTrack</h1>
          <p>Quick daily mental wellbeing check-in for university students.</p>
        </header>

        {currentProgressStep ? <ProgressIndicator currentStep={currentProgressStep} totalSteps={totalSteps} /> : null}
        <StreakTracker entries={entries} />

        {renderScreen()}
      </main>

      <AppFooter />
    </div>
  )
}

export default App
