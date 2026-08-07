import type { GreenFlagResult, RedFlagResult, ScoreColor } from '../types/analysis';

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
