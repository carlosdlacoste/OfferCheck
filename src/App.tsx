import { useState } from 'react'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { TextAreaInput } from './components/Input/TextAreaInput'
import { AnalyzeButton } from './components/Input/AnalyzeButton'
import { ScoreDisplay } from './components/Result/ScoreDisplay'
import { GreenFlagsList } from './components/Result/GreenFlagsList'
import { RedFlagsList } from './components/Result/RedFlagsList'
import { Verdict } from './components/Result/Verdict'
import { LoadingIndicator } from './components/Common/LoadingIndicator'
import { ErrorBanner } from './components/Common/ErrorBanner'
import analyzeJobDescription from './hooks/useAnalyzer'
import type { AnalysisResult } from './types/analysis'

function App() {
  // State management (requirement 16.1)
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value)
    // Clear error when user starts typing again
    if (errorMessage) {
      setErrorMessage(null)
    }
    // Clear previous analysis when text changes
    if (analysisResult) {
      setAnalysisResult(null)
    }
  }

  // Handle analyze button click
  const handleAnalyze = () => {
    // Validation: Empty input (requirement 2.1)
    if (jobDescription.trim().length === 0) {
      setErrorMessage('La descripción no puede estar vacía')
      return
    }

    // Validation: Too short (requirement 2.2)
    if (jobDescription.length < 100) {
      setErrorMessage('La descripción es demasiado corta para un análisis significativo')
      return
    }

    // Validation: Too long (requirement 2.3)
    if (jobDescription.length > 50000) {
      setErrorMessage('La descripción es demasiado larga')
      return
    }

    // Clear any previous errors
    setErrorMessage(null)
    setIsLoading(true)
    setAnalysisResult(null)

    // Run analysis
    try {
      const result = analyzeJobDescription(jobDescription)
      setAnalysisResult(result)
    } catch (error) {
      // This shouldn't happen since we validated above, but just in case
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Error al analizar la oferta. Por favor, intenta nuevamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle error dismiss
  const handleDismissError = () => {
    setErrorMessage(null)
  }

  return (
    <>
      {/* Header - requirement 16.1 */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
        {/* Input Section */}
        <section className="mb-8">
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <label htmlFor="job-description" className="block text-sm font-medium text-slate-300 mb-3">
              📝 Introduce la descripción de la oferta:
            </label>
            <TextAreaInput
              value={jobDescription}
              onChange={handleInputChange}
              placeholder="Pega aquí la descripción de la oferta de trabajo..."
              disabled={isLoading}
            />
            <AnalyzeButton
              isLoading={isLoading}
              onClick={handleAnalyze}
              textLength={jobDescription.length}
            />
          </div>
        </section>

        {/* Error Banner - shown when there's an error */}
        {errorMessage && (
          <section className="mb-6 animate-fade-in">
            <ErrorBanner
              message={errorMessage}
              onDismiss={handleDismissError}
            />
          </section>
        )}

        {/* Loading Indicator - shown after 200ms delay during processing */}
        <LoadingIndicator isLoading={isLoading} delay={200} />

        {/* Results Section - shown when analysis is complete */}
        {analysisResult && !isLoading && (
          <section className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-slate-100">
                Resultado del Análisis
              </h2>
              <p className="text-slate-400 text-sm">
                Procesado en {(analysisResult.processingTime).toFixed(1)}ms
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
              <ScoreDisplay
                score={analysisResult.score}
                color={analysisResult.color}
              />
            </div>

            {/* Green Flags */}
            <GreenFlagsList greenFlags={analysisResult.greenFlags} />

            {/* Red Flags */}
            <RedFlagsList redFlags={analysisResult.redFlags} />

            {/* Verdict */}
            <Verdict verdict={analysisResult.verdict} />
          </section>
        )}
      </main>

      {/* Footer - requirement 16.1 */}
      <Footer />
    </>
  )
}

export default App
