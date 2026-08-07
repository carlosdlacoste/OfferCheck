export interface Pattern {
  regex: RegExp;
  name: string;
  category: string;
}

// Green Flags patterns
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

export const TECHNOLOGY_STACK_PATTERNS: Pattern[] = [
  {
    regex: /\b(React|Vue|Angular|Svelte|Next|Nuxt|Remix)\b/gi,
    name: 'Frontend Framework',
    category: 'stack'
  },
  {
    regex: /\b(JavaScript|TypeScript|Python|Java|C#|PHP|Ruby|Go|Rust|Node|Deno)\b/gi,
    name: 'Backend Language',
    category: 'stack'
  },
  {
    regex: /\b(PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|DynamoDB|Firebase|Supabase)\b/gi,
    name: 'Database',
    category: 'stack'
  },
  {
    regex: /\b(Docker|Kubernetes|AWS|Azure|GCP|CI\/CD|Jenkins|GitHub\s+Actions|GitLab\s+CI)\b/gi,
    name: 'DevOps',
    category: 'stack'
  },
  {
    regex: /\b(Jest|Cypress|Playwright|Mocha|Chai|Selenium|PHPUnit|PyTest)\b/gi,
    name: 'Testing',
    category: 'stack'
  }
];

export const DEVELOPMENT_PATTERNS: Pattern[] = [
  {
    regex: /\bformación\s+continua\b/gi,
    name: 'Continuous Training',
    category: 'desarrollo'
  },
  {
    regex: /\bformación\s+específica\b/gi,
    name: 'Specific Training',
    category: 'desarrollo'
  },
  {
    regex: /\bcapacitación\b/gi,
    name: 'Training',
    category: 'desarrollo'
  },
  {
    regex: /\bdesarrollo\s+profesional\b/gi,
    name: 'Professional Development',
    category: 'desarrollo'
  },
  {
    regex: /\bgrowth\b/gi,
    name: 'Growth',
    category: 'desarrollo'
  },
  {
    regex: /\baprendizaje\b/gi,
    name: 'Learning',
    category: 'desarrollo'
  }
];

// Red Flags patterns
export const OVERWORK_PATTERNS: Pattern[] = [
  {
    regex: /\btrabajo\s+bajo\s+presión\b/gi,
    name: 'Work Under Pressure',
    category: 'sobretiempo'
  },
  {
    regex: /\bponerse\s+la\s+camiseta\b/gi,
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
    regex: /\bfin\s+de\s+semana\b/gi,
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