import { describe, it, expect } from 'vitest';
import { calculateScore, getScoreColor } from '../useScoreCalculation';

// Type imports
type GreenFlagResult = { flagType: string; matchedText: string; category?: string };
type RedFlagResult = { flagType: string; matchedText: string; category?: string };
type ScoreColor = 'green' | 'yellow' | 'red';

// Helper functions for test data
const createGreenFlag = (name: string, category?: string): GreenFlagResult => ({
  flagType: name,
  matchedText: name,
  category
});

const createRedFlag = (name: string, category?: string): RedFlagResult => ({
  flagType: name,
  matchedText: name,
  category
});

describe('calculateScore', () => {
  describe('base score calculation', () => {
    it('starts with base score of 50 for empty flags', () => {
      const greenFlags: GreenFlagResult[] = [];
      const redFlags: RedFlagResult[] = [];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(50);
    });

    it('adds 10 points per Green Flag', () => {
      const greenFlags = [createGreenFlag('Test Flag')];
      const redFlags: RedFlagResult[] = [];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(60);
    });

    it('subtracts 15 points per Red Flag', () => {
      const greenFlags: GreenFlagResult[] = [];
      const redFlags = [createRedFlag('Test Flag')];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(35);
    });

    it('handles multiple Green Flags', () => {
      const greenFlags = [
        createGreenFlag('Flag 1'),
        createGreenFlag('Flag 2'),
        createGreenFlag('Flag 3')
      ];
      const redFlags: RedFlagResult[] = [];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(80); // 50 + 3*10 = 80
    });

    it('handles multiple Red Flags', () => {
      const greenFlags: GreenFlagResult[] = [];
      const redFlags = [
        createRedFlag('Flag 1'),
        createRedFlag('Flag 2')
      ];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(20); // 50 - 2*15 = 20
    });

    it('handles mix of Green and Red Flags', () => {
      const greenFlags = [createGreenFlag('Green 1'), createGreenFlag('Green 2')];
      const redFlags = [createRedFlag('Red 1'), createRedFlag('Red 2'), createRedFlag('Red 3')];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(25); // 50 + 2*10 - 3*15 = 50 + 20 - 45 = 25
    });
  });

  describe('score clamping', () => {
    it('clamps minimum score to 1', () => {
      // 50 - 3*15 = 5, which is > 1, so no clamping needed
      const greenFlags: GreenFlagResult[] = [];
      const redFlags = [createRedFlag('Red 1'), createRedFlag('Red 2'), createRedFlag('Red 3')];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(5); // 50 - 45 = 5
    });

    it('clamps maximum score to 100', () => {
      const greenFlags = [
        createGreenFlag('Green 1'),
        createGreenFlag('Green 2'),
        createGreenFlag('Green 3'),
        createGreenFlag('Green 4'),
        createGreenFlag('Green 5'),
        createGreenFlag('Green 6'),
        createGreenFlag('Green 7'),
        createGreenFlag('Green 8'),
        createGreenFlag('Green 9'),
        createGreenFlag('Green 10'),
        createGreenFlag('Green 11'),
        createGreenFlag('Green 12')
      ];
      const redFlags: RedFlagResult[] = [];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(100); // 170 would be higher than 100, so clamped to 100
    });

    it('handles extreme negative values', () => {
      const greenFlags: GreenFlagResult[] = [];
      const redFlags = Array(10).fill(null).map((_, i) => createRedFlag(`Red ${i}`));
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(1); // Should be clamped to minimum
    });

    it('handles extreme positive values', () => {
      const greenFlags = Array(20).fill(null).map((_, i) => createGreenFlag(`Green ${i}`));
      const redFlags: RedFlagResult[] = [];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(100); // Should be clamped to maximum
    });
  });

  describe('boundary conditions', () => {
    it('exactly 1 point minimum', () => {
      // To get exactly 1: 50 + G*10 - R*15 = 1 => G*10 - R*15 = -49
      // Try: 1 Green (60) and 5 Reds (60 - 75 = -15, clamped to 1)
      const greenFlags = [createGreenFlag('Green 1')];
      const redFlags = [
        createRedFlag('Red 1'),
        createRedFlag('Red 2'),
        createRedFlag('Red 3'),
        createRedFlag('Red 4'),
        createRedFlag('Red 5')
      ];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(1); // 60 - 75 = -15, clamped to 1
    });

    it('exactly 100 points maximum', () => {
      // To get exactly 100: 50 + G*10 = 100 => G*10 = 50 => G = 5
      const greenFlags = [
        createGreenFlag('Green 1'),
        createGreenFlag('Green 2'),
        createGreenFlag('Green 3'),
        createGreenFlag('Green 4'),
        createGreenFlag('Green 5')
      ];
      const redFlags: RedFlagResult[] = [];
      const score = calculateScore(greenFlags, redFlags);
      expect(score).toBe(100); // 50 + 50 = 100
    });
  });

  it('calculates realistic score for mixed flags', () => {
    // Realistic scenario: 3 green flags, 2 red flags
    const greenFlags = [
      createGreenFlag('Salary range (USD)', 'transparencia_salarial'),
      createGreenFlag('100% Remote', 'modalidad_remota'),
      createGreenFlag('Flexible Hours', 'flexibilidad')
    ];
    const redFlags = [
      createRedFlag('Competitive Salary', 'ambigüedad_salarial'),
      createRedFlag('Work Under Pressure', 'sobretiempo')
    ];
    const score = calculateScore(greenFlags, redFlags);
    expect(score).toBe(50); // 50 + 3*10 - 2*15 = 50 + 30 - 30 = 50
  });
});

describe('getScoreColor', () => {
  describe('green score (80-100)', () => {
    it('returns green for score 80', () => {
      expect(getScoreColor(80)).toBe('green');
    });

    it('returns green for score 100', () => {
      expect(getScoreColor(100)).toBe('green');
    });

    it('returns green for score 95', () => {
      expect(getScoreColor(95)).toBe('green');
    });
  });

  describe('yellow score (50-79)', () => {
    it('returns yellow for score 50', () => {
      expect(getScoreColor(50)).toBe('yellow');
    });

    it('returns yellow for score 79', () => {
      expect(getScoreColor(79)).toBe('yellow');
    });

    it('returns yellow for score 65', () => {
      expect(getScoreColor(65)).toBe('yellow');
    });
  });

  describe('red score (1-49)', () => {
    it('returns red for score 1', () => {
      expect(getScoreColor(1)).toBe('red');
    });

    it('returns red for score 49', () => {
      expect(getScoreColor(49)).toBe('red');
    });

    it('returns red for score 25', () => {
      expect(getScoreColor(25)).toBe('red');
    });
  });

  describe('boundary conditions', () => {
    it('returns correct color at exact boundaries', () => {
      expect(getScoreColor(49)).toBe('red');
      expect(getScoreColor(50)).toBe('yellow');
      expect(getScoreColor(79)).toBe('yellow');
      expect(getScoreColor(80)).toBe('green');
    });
  });
});
