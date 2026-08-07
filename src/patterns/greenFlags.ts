import { Pattern } from './types';

// Salary Transparency Patterns (Green Flags)
// Detects: $X-$Y, €X-€Y, "de X a Y", "entre X e Y", "from X to Y"

export const SALARY_PATTERNS: Pattern[] = [
  {
    regex: /\$[\d,]+(?:\s*-\s*\$[\d,]+)?/gi,
    name: 'Salary range (USD)',
    category: 'transparencia_salarial'
  },
  {
    regex: /€[\d,]+(?:\s*-\s*€[\d,]+)?/gi,
    name: 'Salary range (EUR)',
    category: 'transparencia_salarial'
  },
  {
    regex: /\b(de\s+)?\d+[\s,]?\d*\s*(a|y)\s+(de\s+)?\d+[\s,]?\d*\b/gi,
    name: 'Salary range (es)',
    category: 'transparencia_salarial'
  },
  {
    regex: /\b(entre\s+)?\d+[\s,]?\d*\s*(y|e)\s+(entre\s+)?\d+[\s,]?\d*\b/gi,
    name: 'Salary range (between)',
    category: 'transparencia_salarial'
  },
  {
    regex: /\b(from\s+)?\d+[\s,]?\d*\s*(to|y)\s+(from\s+)?\d+[\s,]?\d*\b/gi,
    name: 'Salary range (from-to)',
    category: 'transparencia_salarial'
  }
];