import { findFlags } from '../findFlags';
import { SALARY_PATTERNS, REMOTE_PATTERNS } from '../greenFlags';
import { OVERWORK_PATTERNS, SALARY_AMBIGUITY_PATTERNS } from '../redFlags';

describe('findFlags', () => {
  test('finds single match in text', () => {
    const text = 'Ofrecemos un sueldo de $50,000 - $70,000 anuales';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, SALARY_PATTERNS, results);
    
    expect(results).toHaveLength(1);
    expect(results[0].flagType).toBe('Salary range (USD)');
    expect(results[0].matchedText).toBe('$50,000 - $70,000');
    expect(results[0].category).toBe('transparencia_salarial');
  });

  test('finds multiple matches in text', () => {
    // "trabajo 100% remoto" matches: 100% remoto, trabajo remoto (2 matches, not 3 because regex state)
    // "sueldo competitivo" matches: Competitive Salary (1 match)
    // "disponibilidad 24/7" matches: 24/7 Availability (1 match)
    const text = 'Trabajo 100% remoto con sueldo competitivo y disponibilidad 24/7';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, [...REMOTE_PATTERNS, ...OVERWORK_PATTERNS, ...SALARY_AMBIGUITY_PATTERNS], results);
    
    // Total: 2 (remote) + 1 (salary) + 1 (overwork) = 4 matches
    expect(results).toHaveLength(4);
    expect(results.some(r => r.flagType === '100% Remote')).toBe(true);
    expect(results.some(r => r.flagType === 'Competitive Salary')).toBe(true);
    expect(results.some(r => r.flagType === '24/7 Availability')).toBe(true);
  });

  test('handles multiple occurrences of same pattern', () => {
    // "trabajo 100% remoto" matches: 100% remoto, trabajo remoto (2 matches, not 3)
    const text = 'Trabajo 100% remoto son lo mismo';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, REMOTE_PATTERNS, results);
    
    // Two patterns match (100% remoto and trabajo remoto)
    expect(results).toHaveLength(2);
    expect(results.some(r => r.flagType === '100% Remote')).toBe(true);
    expect(results.some(r => r.flagType === 'Remote Work')).toBe(true);
  });

  test('handles case insensitive matching', () => {
    const text = 'SUELDO COMPETITIVO y TRABAJO BAJO PRESIÓN';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, [...OVERWORK_PATTERNS, ...SALARY_AMBIGUITY_PATTERNS], results);
    
    expect(results).toHaveLength(2);
    expect(results.some(r => r.flagType === 'Competitive Salary')).toBe(true);
    expect(results.some(r => r.flagType === 'Work Under Pressure')).toBe(true);
  });

  test('collects results in provided array', () => {
    const text = 'Oferta con trabajo flexible y horario adaptable';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, REMOTE_PATTERNS, results);
    
    // No matches for remote patterns (flexible/horario are flexibility patterns)
    expect(results).toHaveLength(0);
  });

  test('works with empty patterns array', () => {
    const text = 'Esta oferta no tiene ninguna de las patrones definidos';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, [], results);
    
    expect(results).toHaveLength(0);
  });

  test('works with empty text', () => {
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags('', REMOTE_PATTERNS, results);
    
    expect(results).toHaveLength(0);
  });

  test('trims matched text correctly', () => {
    // "trabajo 100% remoto" matches: 100% remoto, trabajo remoto (2 matches)
    // The pattern \b100%\s*remoto\b matches "100% remoto" with spaces trimmed
    // The pattern \btrabajo\s+remoto\b matches "trabajo remoto" with spaces trimmed
    const text = 'Ofrecemos   trabajo   100% remoto   ';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, REMOTE_PATTERNS, results);
    
    expect(results).toHaveLength(2);
    expect(results[0].matchedText).toBe('100% remoto');
    expect(results[1].matchedText).toBe('trabajo remoto');
  });

  test('collects results from multiple pattern arrays', () => {
    // "100% remoto" - 1 match
    // "€40.000 - €50.000" - 1 match
    // "formación continua" - 1 match
    const text = '100% remoto, sueldo de €40.000 - €50.000, formación continua';
    const results: Array<{flagType: string; matchedText: string; category?: string}> = [];
    
    findFlags(text, [...REMOTE_PATTERNS, ...SALARY_PATTERNS, ...OVERWORK_PATTERNS], results);
    
    expect(results).toHaveLength(3);
    expect(results[0].flagType).toBe('100% Remote');
    expect(results[1].flagType).toBe('Salary range (EUR)');
    expect(results[2].flagType).toBe('Continuous Training');
  });
});
