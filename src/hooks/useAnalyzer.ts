import { findFlags } from '../patterns/findFlags';
import type { Pattern } from '../patterns/types';
import type { AnalysisResult, FlagResult } from '../types/analysis';
import {
  SALARY_PATTERNS,
  REMOTE_PATTERNS,
  FLEXIBILITY_PATTERNS,
  FRONTEND_PATTERNS,
  BACKEND_PATTERNS,
  DATABASE_PATTERNS,
  DEVOPS_PATTERNS,
  TESTING_PATTERNS,
  DEVELOPMENT_PATTERNS
} from '../patterns/greenFlags';
import {
  OVERWORK_PATTERNS,
  SALARY_AMBIGUITY_PATTERNS,
  EXCESSIVE_HIRING_PATTERNS
} from '../patterns/redFlags';
import { calculateScore, getScoreColor, generateVerdict } from '../hooks/useScoreCalculation';

// Combined pattern arrays for analysis
const GREEN_FLAG_PATTERNS: Pattern[] = [
  ...SALARY_PATTERNS,
  ...REMOTE_PATTERNS,
  ...FLEXIBILITY_PATTERNS,
  ...FRONTEND_PATTERNS,
  ...BACKEND_PATTERNS,
  ...DATABASE_PATTERNS,
  ...DEVOPS_PATTERNS,
  ...TESTING_PATTERNS,
  ...DEVELOPMENT_PATTERNS
];

const RED_FLAG_PATTERNS: Pattern[] = [
  ...OVERWORK_PATTERNS,
  ...SALARY_AMBIGUITY_PATTERNS,
  ...EXCESSIVE_HIRING_PATTERNS
];

// Stack technology categories for detection
const STACK_CATEGORIES = [
  { name: 'frontend', patterns: FRONTEND_PATTERNS },
  { name: 'backend', patterns: BACKEND_PATTERNS },
  { name: 'database', patterns: DATABASE_PATTERNS },
  { name: 'devops', patterns: DEVOPS_PATTERNS },
  { name: 'testing', patterns: TESTING_PATTERNS }
];

// Flag types that count as technology-related
const TECHNOLOGY_CATEGORIES = ['frontend', 'backend', 'database', 'devops', 'testing'];

/**
 * Validates input text length according to requirements
 * @throws Error with appropriate message if validation fails
 */
function validateInputLength(text: string): void {
  if (text.trim().length === 0) {
    throw new Error('La descripción no puede estar vacía');
  }
  
  if (text.length < 100) {
    throw new Error('La descripción es demasiado corta para un análisis significativo');
  }
  
  if (text.length > 50000) {
    throw new Error('La descripción es demasiado larga');
  }
}

/**
 * Counts unique technology stack technologies and categories
 * @returns Object with technology count, category count, and stack status
 */
function countStackTechnologies(text: string): { 
  technologyCount: number; 
  categoryCount: number;
  isStackDelimitado: boolean;
  isTodoterreno: boolean;
} {
  const foundTechnologies = new Set<string>();
  const foundCategories = new Set<string>();
  
  for (const { name, patterns } of STACK_CATEGORIES) {
    for (const pattern of patterns) {
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        foundTechnologies.add(match[0].trim().toLowerCase());
        foundCategories.add(name);
      }
    }
  }
  
  const technologyCount = foundTechnologies.size;
  const categoryCount = foundCategories.size;
  
  return {
    technologyCount,
    categoryCount,
    isStackDelimitado: technologyCount >= 3,
    isTodoterreno: technologyCount > 8 || categoryCount >= 3
  };
}

/**
 * Checks if text contains excessive hiring process indicators
 */
function hasExcessiveHiringProcess(text: string): boolean {
  // Check for patterns like "más de 3 fases", "más de 4 fases", etc.
  const excessiveHiringRegex = /\b(más\s+de\s+\d+\s+fases|múltiples\s+pruebas\s+técnicas|varias\s+entrevistas\s+técnicas|proceso\s+selectivo\s+extenso)\b/gi;
  return excessiveHiringRegex.test(text);
}

/**
 * Main analysis function for job descriptions
 * Implements requirements 2.1, 2.2, 2.3, 9.1, 9.2, 10.1, 10.2
 */
export default function analyzeJobDescription(text: string): AnalysisResult {
  const startTime = performance.now();
  
  // Input validation (requirements 2.1, 2.2, 2.3)
  validateInputLength(text);
  
  // Initialize results arrays
  const greenFlags: FlagResult[] = [];
  const redFlags: FlagResult[] = [];
  
  // Run pattern matching
  findFlags(text, GREEN_FLAG_PATTERNS, greenFlags);
  findFlags(text, RED_FLAG_PATTERNS, redFlags);
  
  // Count stack technologies (requirements 9.1, 9.2)
  const stackData = countStackTechnologies(text);
  
  // Detect stack técnico delimitado (3+ technologies)
  if (stackData.isStackDelimitado) {
    greenFlags.push({
      flagType: 'stack_tecnico',
      matchedText: 'Stack técnico delimitado',
      category: 'stack'
    });
  }
  
  // Detect todoterreno profiles (requirement 9.1)
  if (stackData.isTodoterreno) {
    redFlags.push({
      flagType: 'todoterreno',
      matchedText: 'Perfil todoterreno excesivo',
      category: 'excesivo'
    });
  }
  
  // Check for excessive hiring process (requirement 10.1, 10.2)
  if (hasExcessiveHiringProcess(text)) {
    redFlags.push({
      flagType: 'proceso_selectivo_extenso',
      matchedText: 'Proceso selectivo extenso',
      category: 'proceso_selectivo'
    });
  }
  
  const processingTime = performance.now() - startTime;
  
  return {
    textLength: text.length,
    score: calculateScore(greenFlags, redFlags),
    color: getScoreColor(calculateScore(greenFlags, redFlags)),
    verdict: generateVerdict(calculateScore(greenFlags, redFlags), greenFlags, redFlags),
    greenFlags,
    redFlags,
    processingTime
  };
}
