import type { GreenFlagResult } from '../../types/analysis';

interface GreenFlagsListProps {
  greenFlags: GreenFlagResult[];
}

/**
 * GreenFlagsList component
 * Displays a list of green flags found in the job description
 * 
 * Requirements: 13.1, 13.2, 13.3
 */
export function GreenFlagsList({ greenFlags }: GreenFlagsListProps) {
  if (greenFlags.length === 0) {
    return (
      <div className="bg-card border-border rounded-lg p-6">
        <div className="text-green-400 font-medium mb-2">
          🟢 Green Flags Encontradas
        </div>
        <div className="text-foreground text-sm">
          No se detectaron green flags en esta descripción
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-green-400 font-medium mb-4 flex items-center justify-center gap-2">
        🟢 Green Flags Encontradas: {greenFlags.length}
      </div>
      
      <ul className="space-y-3">
        {greenFlags.map((flag, index) => (
          <li 
            key={index} 
            className="bg-card border border-border rounded-md p-3 hover:border-border transition-colors"
          >
            <div className="flex items-start gap-2">
              <span className="text-green-400 text-sm font-medium mt-0.5">
                {flag.flagType}
              </span>
              {flag.category && (
                <span className="text-green-400/60 text-xs uppercase tracking-wider">
                  {flag.category}
                </span>
              )}
            </div>
            <div className="mt-2 text-foreground text-sm italic">
              "{flag.matchedText}"
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GreenFlagsList;
