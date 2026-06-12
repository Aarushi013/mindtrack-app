import { useState } from 'react'
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

function App() {
  console.log('Supabase connected:', supabase)                                                 
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [studentName, setStudentName] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [journalEntry, setJournalEntry] = useState('')
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

  const { data, error } = await supabase
    .from('mood_entries')
    .insert([
      {
        mood: selectedMood,
        journal_entry: cleanedEntry
      }
    ])

  if (error) {
    console.error('Supabase error:', error)
  } else {
    console.log('Saved successfully:', data)
  }

  setJournalEntry(cleanedEntry)
  setCurrentScreen('suggestions')

  }

  const goToInsights = () => {
    setCurrentScreen('insights')
  }

  const goToWellnessActivity = () => {
    setCurrentScreen('wellness')
  }

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

  const renderScreen = () => {
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
          onContinue={goToWellnessActivity}
        />
      )
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

      <TopNav showActions={isWelcomeScreen} />

      <main className="content-wrap">
        <header className="app-header screen-enter">
          <h1>MindTrack</h1>
          <p>Quick daily mental wellbeing check-in for university students.</p>
        </header>

        <ProgressIndicator currentStep={progressSteps[currentScreen]} totalSteps={totalSteps} />
        <StreakTracker />

        {renderScreen()}
      </main>

      <AppFooter />
    </div>
  )
}

export default App
