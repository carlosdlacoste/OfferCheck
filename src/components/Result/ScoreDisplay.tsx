import type { ScoreColor } from '../../types/analysis';

interface ScoreDisplayProps {
  score: number;
  color: ScoreColor;
}

/**
 * ScoreDisplay component
 * Displays the quality score with color-coded background
 * 
 * Requirements: 11.1, 12.1, 13.1, 14.1
 */
export function ScoreDisplay({ score, color }: ScoreDisplayProps) {
  // Color classes for score ranges
  const colorClasses = {
    green: 'bg-green-500/10 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/30'
  };

  return (
    <div className={`border rounded-lg p-6 text-center ${colorClasses[color]}`}>
      <div className="text-sm uppercase tracking-wider opacity-75 mb-2">
        Score de Calidad
      </div>
      <div className="text-5xl font-bold tracking-tight">
        {score}
      </div>
      <div className="mt-2 text-sm opacity-75">
        de 1 a 100
      </div>
    </div>
  );
}

export default ScoreDisplay;
