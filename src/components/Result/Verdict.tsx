import type { Verdict as VerdictType } from '../../types/analysis';

interface VerdictProps {
  verdict: VerdictType;
}

/**
 * Verdict component
 * Displays the quick verdict with actionable advice and influential flags
 * 
 * Requirements: 15.1, 15.2, 15.3, 15.4
 */
export function Verdict({ verdict }: VerdictProps) {
  const { title, description, advice, flagsThatInfluenced } = verdict;

  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
      <div className="text-slate-100 font-medium mb-2 flex items-center gap-2">
        💡 Veredicto Rápido
      </div>
      
      <div className="mb-3">
        <div className="text-lg font-semibold text-slate-100">
          {title}
        </div>
        <div className="text-slate-400 text-sm">
          {description}
        </div>
      </div>
      
      {advice && (
        <div className="bg-slate-800/50 border border-slate-600/30 rounded-md p-3 mb-3">
          <div className="text-slate-300 text-sm italic">
            "{advice}"
          </div>
        </div>
      )}
      
      {flagsThatInfluenced && flagsThatInfluenced.length > 0 && (
        <div className="text-slate-400 text-sm">
          <span className="font-medium mb-1 block">
            Señales influyentes: {flagsThatInfluenced.length}
          </span>
          <ul className="space-y-1">
            {flagsThatInfluenced.map((flag, index) => (
              <li 
                key={index} 
                className="bg-slate-800/40 rounded px-2 py-1 text-xs"
              >
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Verdict;
