import type { Pattern } from './types';

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

// Technology Stack Patterns (Green Flags)
// Detects: frontend frameworks, backend languages, databases, DevOps tools, testing frameworks
// Categories tracked: frontend, backend, database, devops, testing

export const FRONTEND_PATTERNS: Pattern[] = [
  {
    regex: /\b(React|Vue|Angular|Svelte|Next|Nuxt|Remix)\b/gi,
    name: 'Frontend Framework',
    category: 'frontend'
  }
];

export const BACKEND_PATTERNS: Pattern[] = [
  {
    regex: /\b(JavaScript|TypeScript|Python|Java|C#|PHP|Ruby|Go|Rust|Node|Deno)\b/gi,
    name: 'Backend Language',
    category: 'backend'
  }
];

export const DATABASE_PATTERNS: Pattern[] = [
  {
    regex: /\b(PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|DynamoDB|Firebase|Supabase)\b/gi,
    name: 'Database',
    category: 'database'
  }
];

export const DEVOPS_PATTERNS: Pattern[] = [
  {
    regex: /\b(Docker|Kubernetes|AWS|Azure|GCP|CI\/CD|Jenkins|GitHub\s+Actions|GitLab\s+CI)\b/gi,
    name: 'DevOps',
    category: 'devops'
  }
];

export const TESTING_PATTERNS: Pattern[] = [
  {
    regex: /\b(Jest|Cypress|Playwright|Mocha|Chai|Selenium|PHPUnit|PyTest)\b/gi,
    name: 'Testing Framework',
    category: 'testing'
  }
];

// Development Opportunity Patterns (Green Flags)
// Detects: "formación continua", "formación específica", "capacitación", "desarrollo profesional", "growth", "aprendizaje"

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
