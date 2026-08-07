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

// Remote Work Patterns (Green Flags)
// Detects: "100% remoto", "totalmente remoto", "remoto", "trabajo remoto"

export const REMOTE_PATTERNS: Pattern[] = [
  {
    regex: /\b100%\s*remoto\b/gi,
    name: '100% Remote',
    category: 'modalidad_remota'
  },
  {
    regex: /\btotalmente\s+remoto\b/gi,
    name: 'Totally Remote',
    category: 'modalidad_remota'
  },
  {
    regex: /\bremoto\b/gi,
    name: 'Remote',
    category: 'modalidad_remota'
  },
  {
    regex: /\btrabajo\s+remoto\b/gi,
    name: 'Remote Work',
    category: 'modalidad_remota'
  }
];

// Flexibility Patterns (Green Flags)
// Detects: "flexibilidad horaria", "horario flexible", "horario adaptado", "work-life balance"

export const FLEXIBILITY_PATTERNS: Pattern[] = [
  {
    regex: /\bflexibilidad\s+horaria\b/gi,
    name: 'Flexible Hours',
    category: 'flexibilidad'
  },
  {
    regex: /\bhorario\s+flexible\b/gi,
    name: 'Flexible Schedule',
    category: 'flexibilidad'
  },
  {
    regex: /\bhorario\s+adaptado\b/gi,
    name: 'Adaptable Schedule',
    category: 'flexibilidad'
  },
  {
    regex: /\bwork-life\s+balance\b/gi,
    name: 'Work-Life Balance',
    category: 'flexibilidad'
  }
];
