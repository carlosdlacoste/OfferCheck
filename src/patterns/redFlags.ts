import type { Pattern } from './types';

// Overwork/Pressure Patterns (Red Flags)
// Detects: "trabajo bajo presión", "ponerse la camiseta", "disponibilidad 24/7", 
// "disponibilidad continua", "fin de semana", "guardias", "plantilla reducida"

export const OVERWORK_PATTERNS: Pattern[] = [
  {
    regex: /\btrabajo\s+bajo\s+presión\b/gi,
    name: 'Work Under Pressure',
    category: 'sobretiempo'
  },
  {
    regex: /\b(ponerse|poner\s+se)\s+la\s+camiseta\b/gi,
    name: 'Put on the Jersey',
    category: 'sobretiempo'
  },
  {
    regex: /\bdisponibilidad\s+24\/7\b/gi,
    name: '24/7 Availability',
    category: 'sobretiempo'
  },
  {
    regex: /\bdisponibilidad\s+continua\b/gi,
    name: 'Continuous Availability',
    category: 'sobretiempo'
  },
  {
    regex: /\bfines?\s+de\s+semana\b/gi,
    name: 'Weekend Work',
    category: 'sobretiempo'
  },
  {
    regex: /\bguardias\b/gi,
    name: 'On-Call',
    category: 'sobretiempo'
  },
  {
    regex: /\bplantilla\s+reducida\b/gi,
    name: 'Small Team',
    category: 'sobretiempo'
  }
];

// Salary Ambiguity Patterns (Red Flags)
// Detects: "sueldo competitivo", "sueldo a convenir", "no especificado", 
// "a valorar", "a conveniar", "no revelado"

export const SALARY_AMBIGUITY_PATTERNS: Pattern[] = [
  {
    regex: /\bsueldo\s+competitivo\b/gi,
    name: 'Competitive Salary',
    category: 'ambigüedad_salarial'
  },
  {
    regex: /\bsueldo\s+a\s+convenir\b/gi,
    name: 'Salary to Convene',
    category: 'ambigüedad_salarial'
  },
  {
    regex: /\bno\s+especificado\b/gi,
    name: 'Not Specified',
    category: 'ambigüedad_salarial'
  },
  {
    regex: /\ba\s+valorar\b/gi,
    name: 'To Be Valued',
    category: 'ambigüedad_salarial'
  },
  {
    regex: /\ba\s+conveniar\b/gi,
    name: 'To Be Convened',
    category: 'ambigüedad_salarial'
  },
  {
    regex: /\bno\s+revelado\b/gi,
    name: 'Not Revealed',
    category: 'ambigüedad_salarial'
  }
];

// Excessive Hiring Process Patterns (Red Flags)
// Detects: "más de 3 fases", "más de 4 fases", "múltiples pruebas técnicas", 
// "varias entrevistas técnicas", "proceso selectivo extenso"

export const EXCESSIVE_HIRING_PATTERNS: Pattern[] = [
  {
    regex: /\bmás\s+de\s+3\s+fases\b/gi,
    name: 'More than 3 Phases',
    category: 'proceso_selectivo'
  },
  {
    regex: /\bmás\s+de\s+4\s+fases\b/gi,
    name: 'More than 4 Phases',
    category: 'proceso_selectivo'
  },
  {
    regex: /\bmúltiples\s+pruebas\s+técnicas\b/gi,
    name: 'Multiple Technical Tests',
    category: 'proceso_selectivo'
  },
  {
    regex: /\bvarias\s+entrevistas\s+técnicas\b/gi,
    name: 'Multiple Technical Interviews',
    category: 'proceso_selectivo'
  },
  {
    regex: /\bproceso\s+selectivo\s+extenso\b/gi,
    name: 'Extensive Hiring Process',
    category: 'proceso_selectivo'
  }
];
