import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

interface AnalyzeButtonProps {
  isLoading: boolean
  onClick: () => void
  textLength: number
}

/**
 * AnalyzeButton - Central button for triggering job offer analysis
 * 
 * Requirements: 1.3, 17.1, 17.2
 * - Requirement 1.3: When the Candidate clicks 'Analizar Oferta', validate the input
 * - Requirement 17.1: When Candidate clicks 'Analizar Oferta', analyzer completes within 1000ms
 * - Requirement 17.2: While processing, display loading indicator if processing exceeds 200ms
 */
export const AnalyzeButton = ({ isLoading, onClick, textLength }: AnalyzeButtonProps) => {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false)

  // Show loading indicator after 200ms if still loading
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoadingIndicator(true)
      }, 200)
      
      return () => clearTimeout(timer)
    } else {
      setShowLoadingIndicator(false)
    }
  }, [isLoading])

  const handleButtonClick = () => {
    if (!isLoading && textLength > 0) {
      onClick()
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 my-2">
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isLoading || textLength === 0}
        className={`
          mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40
          ${isLoading 
            ? 'bg-primary cursor-not-allowed' 
            : textLength === 0
              ? 'bg-primary cursor-not-allowed'
              : 'bg-primary hover:shadow-[0_24px_70px_-32px_var(--primary)] active:scale-95'
          }
          focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
          disabled:opacity-50 disabled:cursor-not-allowed
          w-full max-w-md
        `}
        aria-label="Analizar oferta de trabajo"
        aria-disabled={isLoading || textLength === 0}
      >
        Analizar Oferta <ArrowRight className="size-4" />
        
        {/* Loading spinner overlay */}
        {isLoading && showLoadingIndicator && (
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span className="text-sm font-medium">Procesando...</span>
          </div>
        )}
      </button>
    </div>
  )
}
