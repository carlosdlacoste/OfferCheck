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
    <div className="bg-card border border-border rounded-lg p-6 shadow-[0_24px_70px_-32px_var(--primary)]">
      <div className="text-lg text-foreground font-semibold mb-2 flex items-center gap-2">
        💡 Veredicto Rápido
      </div>
      
      <div className="mb-3">
        <div className="font-semibold text-foreground">
          {title}
        </div>
        <div className="text-muted-foreground text-sm">
          {description}
        </div>
      </div>
      
      {advice && (
        <div className="bg-muted/45 border border-slate-600/30 rounded-md p-3 mb-3">
          <div className="text-foreground text-sm italic">
            "{advice}"
          </div>
        </div>
      )}
      
      {flagsThatInfluenced && flagsThatInfluenced.length > 0 && (
        <div className="text-muted-foreground text-sm">
          <span className="font-medium mb-1 block">
            Señales influyentes: {flagsThatInfluenced.length}
          </span>
          <ul className="space-y-1">
            {flagsThatInfluenced.map((flag, index) => (
              <li 
                key={index} 
                className="bg-muted/45 rounded px-2 py-1 text-xs"
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
