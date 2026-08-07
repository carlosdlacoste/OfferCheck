import type { Pattern } from './types';
import type { FlagResult } from '../types/analysis';

/**
 * Searches text for all patterns in a patterns array and collects matches.
 * This is a helper function used by both green and red flag analysis.
 *
 * @param text - The text to search for patterns
 * @param patterns - Array of Pattern objects to search for
 * @param results - Results array to populate with matches (passed by reference)
 */
export function findFlags(text: string, patterns: Pattern[], results: FlagResult[]): void {
  if (!text || patterns.length === 0) {
    return;
  }

  const seen = new Set<string>();

  for (const pattern of patterns) {
    // Create a fresh regex to avoid state issues
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchedText = match[0].trim();
      const key = `${pattern.name}:${matchedText}:${match.index}`;

      if (!seen.has(key)) {
        seen.add(key);
        results.push({
          flagType: pattern.name,
          matchedText: matchedText,
          category: pattern.category
        });
      }
      
      // Prevent infinite loops on zero-length matches
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }
  }
}
