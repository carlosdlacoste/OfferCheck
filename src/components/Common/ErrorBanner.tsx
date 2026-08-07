import { useEffect } from 'react'

interface ErrorBannerProps {
  message: string
  onDismiss?: () => void
  autoDismissDelay?: number
}

/**
 * ErrorBanner - Displays error messages in a red banner
 * 
 * Requirements: 2.1, 2.2, 2.3
 * - Requirement 2.1: Display "La descripción no puede estar vacía" for empty textarea
 * - Requirement 2.2: Display "La descripción es demasiado corta para un análisis significativo" for short text
 * - Requirement 2.3: Display "La descripción es demasiado larga" for long text
 * 
 * Features:
 * - Red banner with warning icon
 * - Manual dismiss with close button
 * - Optional auto-dismiss functionality
 * - Dark theme styling with red accent color
 */
export const ErrorBanner = ({ 
  message, 
  onDismiss, 
  autoDismissDelay 
}: ErrorBannerProps) => {
  useEffect(() => {
    if (autoDismissDelay && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss()
      }, autoDismissDelay)
      
      return () => clearTimeout(timer)
    }
  }, [autoDismissDelay, onDismiss])

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss()
    }
  }

  return (
    <div className="bg-slate-800 border border-red-500/30 rounded-lg p-4 shadow-lg animate-fade-in">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0" role="img" aria-label="Warning">
          ⚠️
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-red-400 font-medium text-sm leading-relaxed">
            {message}
          </p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 text-slate-400 hover:text-red-400 transition-colors duration-200"
            aria-label="Cerrar mensaje de error"
            title="Cerrar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

ErrorBanner.displayName = 'ErrorBanner'
