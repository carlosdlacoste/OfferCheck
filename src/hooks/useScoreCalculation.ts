import type { GreenFlagResult, RedFlagResult, ScoreColor, Verdict } from '../types/analysis';

/**
 * Calculates a quality score based on Green Flags and Red Flags
 * 
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
 * 
 * @param greenFlags - Array of detected Green Flags
 * @param redFlags - Array of detected Red Flags
 * @returns Score between 1 and 100
 */
export function calculateScore(
  greenFlags: GreenFlagResult[],
  redFlags: RedFlagResult[]
): number {
  const baseScore = 50;
  const greenPoints = 10;
  const redPoints = -15;

  let score = baseScore;
  score += greenFlags.length * greenPoints;
  score += redFlags.length * redPoints;

  // Clamp between 1 and 100
  return Math.max(1, Math.min(100, score));
}

/**
 * Returns the color indicator for a given score
 * 
 * Requirements: 11.1, 11.2, 11.3
 * 
 * @param score - Score value between 1 and 100
 * @returns Color: 'green' (80-100), 'yellow' (50-79), 'red' (1-49)
 */
export function getScoreColor(score: number): ScoreColor {
  if (score >= 80) {
    return 'green';
  }
  if (score >= 50) {
    return 'yellow';
  }
  return 'red';
}

/**
 * Generates a verdict based on score thresholds and detected flags
 * 
 * Requirements: 15.1, 15.2, 15.3, 15.4
 * 
 * Score thresholds:
 * - 80+: Excelente oportunidad - Recomendada
 * - 50-79: Oportunidad con potential - Requiere atención a detalles
 * - <50: Alerta - Revisa las Red Flags antes de aplicar
 * 
 * @param score - Quality score between 1 and 100
 * @param greenFlags - Array of detected Green Flags
 * @param redFlags - Array of detected Red Flags
 * @returns Verdict object with title, description, advice, and influenced flags
 */
export function generateVerdict(
  score: number,
  greenFlags: GreenFlagResult[],
  redFlags: RedFlagResult[]
): Verdict {
  const highScoreFlagTexts = greenFlags.map(f => f.matchedText);
  const lowScoreFlagTexts = redFlags.map(f => f.matchedText);
  
  // Determine verdict based on score thresholds
  if (score >= 80) {
    // Score 80+ → "Excelente oportunidad - Recomendada"
    return {
      title: 'Excelente oportunidad',
      description: 'Recomendada',
      advice: 'Esta oferta parece muy prometedora. Los puntos fuertes incluyen: ' + 
        (highScoreFlagTexts.length > 0 
          ? highScoreFlagTexts.slice(0, 3).join(', ') 
          : 'ningún problema detectado'),
      flagsThatInfluenced: highScoreFlagTexts.slice(0, 3)
    };
  } else if (score >= 50) {
    // Score 50-79 → "Oportunidad con potential - Requiere atención a detalles"
    return {
      title: 'Oportunidad con potential',
      description: 'Requiere atención a detalles',
      advice: 'La oferta tiene aspectos positivos, pero también hay algunos puntos de atención. ' +
        'Revisa especialmente: ' + 
        (lowScoreFlagTexts.length > 0 
          ? lowScoreFlagTexts.slice(0, 2).join(', ') 
          : 'ningún problema grave'),
      flagsThatInfluenced: [
        ...highScoreFlagTexts.slice(0, 2), 
        ...lowScoreFlagTexts.slice(0, 2)
      ]
    };
  } else {
    // Score < 50 → "Alerta - Revisa las Red Flags antes de aplicar"
    return {
      title: 'Alerta',
      description: 'Revisa las Red Flags antes de aplicar',
      advice: 'Esta oferta tiene múltiples señales de alerta. ' +
        'Pregunta especialmente por: ' + 
        (lowScoreFlagTexts.length > 0 
          ? lowScoreFlagTexts.slice(0, 3).join(', ') 
          : 'ningún problema detectado') + 
        '. Considera si estás dispuesto/a a asumir estos riesgos.',
      flagsThatInfluenced: lowScoreFlagTexts.slice(0, 3)
    };
  }
}
