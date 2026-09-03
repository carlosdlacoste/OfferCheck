import { forwardRef} from 'react'

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

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target
      // Ensure we don't exceed maxLength
      if (textarea.value.length <= maxLength) {
        onChange(e)
      }
    }

    return (
      <div className="flex w-full flex-col gap-1.5">
        <label htmlFor="job-description" className="sr-only">
          Descripción de la oferta de trabajo
        </label>
        <textarea
          id="job-description"
          ref={ref}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={8}
          className="h-56 w-full resize-none overflow-y-auto rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
          aria-label="Área de texto para pegar la descripción de la oferta de trabajo"
          aria-describedby="input-hint"
          spellCheck={false}
        />
        <div 
          id="input-hint" 
          className="flex justify-end text-xs text-slate-500 pointer-events-none"
          aria-hidden="true"
        >
          {value.length} / {maxLength} caracteres
        </div>
      </div>
    )
  }
)

TextAreaInput.displayName = 'TextAreaInput'
