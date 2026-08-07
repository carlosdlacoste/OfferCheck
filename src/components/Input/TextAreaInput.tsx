import { forwardRef, useRef, useEffect } from 'react'

interface TextAreaInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
}

/**
 * TextAreaInput - Componente de área de texto para ingreso de descripción de ofertas
 * 
 * Requirements: 1.1, 1.2, 18.1
 * - Requirement 1.1: Display textarea element when page loads
 * - Requirement 1.2: Accept text input of any length while user is typing
 * - Requirement 18.1: All analysis occurs on client side without external API calls
 */
export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ value, onChange, placeholder = 'Pega aquí la descripción de la oferta de trabajo...', disabled = false, maxLength = 50000 }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    
    // Auto-resize textarea based on content
    useEffect(() => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [value])

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target
      // Ensure we don't exceed maxLength
      if (textarea.value.length <= maxLength) {
        onChange(e)
        // Adjust height after input
        setTimeout(() => {
          textarea.style.height = 'auto'
          textarea.style.height = `${textarea.scrollHeight}px`
        }, 0)
      }
    }

    return (
      <div className="relative w-full">
        <label htmlFor="job-description" className="sr-only">
          Descripción de la oferta de trabajo
        </label>
        <textarea
          id="job-description"
          ref={ref || textareaRef}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={8}
          className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg p-4 text-base font-mono resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 shadow-sm"
          aria-label="Área de texto para pegar la descripción de la oferta de trabajo"
          aria-describedby="input-hint"
          spellCheck={false}
        />
        <div 
          id="input-hint" 
          className="absolute bottom-2 right-3 text-xs text-slate-500 pointer-events-none"
          aria-hidden="true"
        >
          {value.length} / {maxLength} caracteres
        </div>
      </div>
    )
  }
)

TextAreaInput.displayName = 'TextAreaInput'
