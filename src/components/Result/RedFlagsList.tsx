import type { RedFlagResult } from '../../types/analysis';

interface RedFlagsListProps {
  redFlags: RedFlagResult[];
}

/**
 * RedFlagsList component
 * Displays a list of red flags found in the job description
 * 
 * Requirements: 14.1, 14.2, 14.3
 */
export function RedFlagsList({ redFlags }: RedFlagsListProps) {
  if (redFlags.length === 0) {
    return (
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
        <div className="text-red-400 font-medium mb-2">
          🔴 Red Flags Detectadas
        </div>
        <div className="text-slate-400 text-sm">
          No se detectaron red flags en esta descripción
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
      <div className="text-red-400 font-medium mb-4 flex items-center gap-2">
        🔴 Red Flags Detectadas: {redFlags.length}
      </div>
      
      <ul className="space-y-3">
        {redFlags.map((flag, index) => (
          <li 
            key={index} 
            className="bg-slate-800/50 border border-red-500/20 rounded-md p-3 hover:border-red-400/30 transition-colors"
          >
            <div className="flex items-start gap-2">
              <span className="text-red-400 text-sm font-medium mt-0.5">
                {flag.flagType}
              </span>
              {flag.category && (
                <span className="text-red-400/60 text-xs uppercase tracking-wider">
                  {flag.category}
                </span>
              )}
            </div>
            <div className="mt-2 text-slate-300 text-sm italic">
              "{flag.matchedText}"
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RedFlagsList;
