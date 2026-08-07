export interface AnalysisResult {
  textLength: number;
  score: number;
  color: ScoreColor;
  verdict: Verdict;
  greenFlags: GreenFlagResult[];
  redFlags: RedFlagResult[];
  processingTime: number;
}

export interface FlagResult {
  flagType: string;
  matchedText: string;
  category?: string;
}

export type GreenFlagResult = FlagResult;
export type RedFlagResult = FlagResult;

export type ScoreColor = 'green' | 'yellow' | 'red';

export interface Verdict {
  title: string;
  description: string;
  advice: string;
  flagsThatInfluenced: string[];
}
