function ProgressIndicator({ currentStep, totalSteps }) {
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <section className="progress-card" aria-label="Check-in progress">
      <div className="progress-head">
        <p className="progress-label">Your check-in progress</p>
        <p className="progress-step">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      <div className="progress-track" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep}>
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </section>
  )
}

export default ProgressIndicator
