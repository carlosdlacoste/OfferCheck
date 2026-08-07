import { useState, useEffect } from 'react'

interface LoadingIndicatorProps {
  isLoading: boolean
  delay?: number
}

/**
 * LoadingIndicator - Shows a spinner after a delay when processing
 * 
 * Requirements: 17.2
 * - Display loading indicator if processing exceeds delay (default 200ms)
 * - Fade out when complete
 * - Use dark theme colors
 */
export const LoadingIndicator = ({ isLoading, delay = 200 }: LoadingIndicatorProps) => {
  const [showIndicator, setShowIndicator] = useState(false)

  // Show loading indicator after delay if still loading
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowIndicator(true)
      }, delay)
      
      return () => clearTimeout(timer)
    } else {
      setShowIndicator(false)
    }
  }, [isLoading, delay])

  if (!showIndicator) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-out">
      <div className="flex flex-col items-center gap-4 bg-slate-800/90 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-indigo-400 border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-indigo-400 font-semibold text-lg">Procesando</div>
          </div>
        </div>
        <p className="text-slate-300 text-sm max-w-xs text-center">
          Analizando la oferta laboral, por favor espera...
        </p>
      </div>
    </div>
  )
}
