# Design Document - OfferCheck

## Overview

OfferCheck es una herramienta web de análisis de ofertas de trabajo en IT que se ejecuta completamente en el cliente. El sistema procesa descripciones de ofertas usando reglas/palabras clave para detectar Green Flags (aspectos positivos) y Red Flags (riesgos/alertas), calculando un score de calidad entre 1-100.

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                          OfferCheck App                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────┐         ┌──────────────────┐                  │
│  │   User Interface │         │   Analyzer Core  │                  │
│  │   (React Components)         │   (Logic Layer)  │                  │
│  └────────┬─────────┘         └──────────────────┘                  │
│           │                              │                           │
│           │ 1. Input text                │ 2. Process text           │
│           │                              │                           │
│           │                              │ 3. Match patterns         │
│           │                              │ 4. Count flags            │
│           │                              │ 5. Calculate score        │
│           │                              │                           │
│           │ 6. Display results           │                           │
│           └──────────────────────────────┘                           │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ 7. Render UI
                              ▼
                    ┌─────────────────────┐
                    │   Browser Render    │
                    └─────────────────────┘
```

### Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Pattern Matching**: Expresiones regulares optimizadas
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Hosting**: Static site (puede desplegarse en GitHub Pages, Netlify, Vercel)

---

## Estructura de Componentes React

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # Título y descripción
│   │   └── Footer.tsx          # Información del proyecto
│   │
│   ├── Input/
│   │   ├── TextAreaInput.tsx   # Área de texto para ofertas
│   │   └── AnalyzeButton.tsx   # Botón de análisis
│   │
│   ├── Result/
│   │   ├── ScoreDisplay.tsx    # Score con color y rango
│   │   ├── GreenFlagsList.tsx  # Lista de Green Flags
│   │   ├── RedFlagsList.tsx    # Lista de Red Flags
│   │   └── Verdict.tsx         # Veredicto rápido con consejos
│   │
│   └── Common/
│       ├── LoadingIndicator.tsx # Indicador de carga
│       └── ErrorBanner.tsx     # Mensajes de error
│
├── hooks/
│   ├── useAnalyzer.ts          # Lógica central de análisis
│   └── useScoreCalculation.ts  # Cálculo de scores
│
├── patterns/
│   ├── greenFlags.ts           # Patrones para Green Flags
│   ├── redFlags.ts             # Patrones para Red Flags
│   └── types.ts                # Tipos de patrones y resultados
│
├── types/
│   ├── analysis.ts             # Tipos de resultados de análisis
│   └── score.ts                # Tipos de score y veredictos
│
└── App.tsx                     # Componente principal
```

---

## Diseño de la Interfaz

### Estructura Visual

```
┌──────────────────────────────────────────────────────────────────┐
│  OfferCheck - Análisis de Ofertas de Trabajo                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📝 Introduce la descripción de la oferta:               │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │                                                    │  │  │
│  │  │        (textarea para pegar oferta)               │  │  │
│  │  │                                                    │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                              │  │
│  │  [ 🔍 Analizar Oferta ]  (botón central)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Resultado del Análisis                                     │  │
│  │                                                              │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  📊 Score de Calidad                                │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  │        75 🟡 (color según rango)              │  │  │  │
│  │  │  │        (de 1 a 100)                           │  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  └─────────────────────────────────────���─────────┘  │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                              │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  🟢 Green Flags Encontradas: 3                     │  │  │
│  │  │  • Sueldo especificado: "$40.000 - $60.000"       │  │  │
│  │  │  • Trabajo remoto: "100% remoto"                   │  │  │
│  │  │  • Stack técnico delimitado                         │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                              │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  🔴 Red Flags Detectadas: 1                        │  │  │
│  │  │  • Ambigüedad salarial: "sueldo competitivo"       │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                              │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  💡 Veredicto Rápido                                │  │  │
│  │  │  "Oportunidad con potential - Requiere atención   │  │  │
│  │  │  a detalles: Sueldo no está del todo claro."       │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Tema Oscuro

- **Fondo**: `#0f172a` (slate-900)
- **Tarjetas**: `#1e293b` (slate-800)
- **Texto principal**: `#f1f5f9` (slate-100)
- **Texto secundario**: `#94a3b8` (slate-400)
- **Accent (Green Flag)**: `#4ade80` (green-400)
- **Accent (Red Flag)**: `#f87171` (red-400)
- **Border**: `#334155` (slate-700)

---

## Motor de Análisis

### Estructura de Datos

```typescript
// types/analysis.ts
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
```

### Patrones de Análisis

```typescript
// patterns/greenFlags.ts
export interface Pattern {
  regex: RegExp;
  name: string;
  category: string;
}

export const SALARY_PATTERNS: Pattern[] = [
  {
    regex: /\$[\d,]+(?:\s*-\s*\$[\d,]+)?/gi,
    name: 'Salary range',
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
    category: 'frontend'
  },
  {
    regex: /\b(JavaScript|TypeScript|Python|Java|C#|PHP|Ruby|Go|Rust|Node|Deno)\b/gi,
    name: 'Backend Language',
    category: 'backend'
  },
  {
    regex: /\b(PostgreSQL|MySQL|MongoDB|Redis|Elasticsearch|DynamoDB|Firebase|Supabase)\b/gi,
    name: 'Database',
    category: 'database'
  },
  {
    regex: /\b(Docker|Kubernetes|AWS|Azure|GCP|CI\/CD|Jenkins|GitHub\s+Actions|GitLab\s+CI)\b/gi,
    name: 'DevOps',
    category: 'devops'
  },
  {
    regex: /\b(Jest|Cypress|Playwright|Mocha|Chai|Selenium|PHPUnit|PyTest)\b/gi,
    name: 'Testing',
    category: 'testing'
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
```

```typescript
// patterns/redFlags.ts
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
```

### Lógica de Análisis

```typescript
// hooks/useAnalyzer.ts
export const analyzeJobDescription = (text: string): AnalysisResult => {
  const startTime = performance.now();
  
  // Validación inicial
  if (text.length === 0) {
    throw new Error('La descripción no puede estar vacía');
  }
  if (text.length < 100) {
    throw new Error('La descripción es demasiado corta para un análisis significativo');
  }
  if (text.length > 50000) {
    throw new Error('La descripción es demasiado larga');
  }

  // Búsqueda de patrones
  const greenFlags: GreenFlagResult[] = [];
  const redFlags: RedFlagResult[] = [];

  // Green Flags
  findFlags(text, SALARY_PATTERNS, greenFlags);
  findFlags(text, REMOTE_PATTERNS, greenFlags);
  findFlags(text, FLEXIBILITY_PATTERNS, greenFlags);
  findFlags(text, TECHNOLOGY_STACK_PATTERNS, greenFlags);
  findFlags(text, DEVELOPMENT_PATTERNS, greenFlags);

  // Contar stack técnico delimitado
  const technologyCategories = new Set<string>();
  greenFlags.forEach(flag => {
    if (flag.category) technologyCategories.add(flag.category);
  });
  
  const technologyCount = greenFlags.filter(f => 
    ['frontend', 'backend', 'database', 'devops', 'testing'].includes(f.category || '')
  ).length;
  
  if (technologyCount >= 3) {
    greenFlags.push({
      flagType: 'stack_tecnico',
      matchedText: 'Stack técnico delimitado',
      category: 'stack'
    });
  }

  // Red Flags
  findFlags(text, OVERWORK_PATTERNS, redFlags);
  findFlags(text, SALARY_AMBIGUITY_PATTERNS, redFlags);
  findFlags(text, EXCESSIVE_HIRING_PATTERNS, redFlags);

  // Detectar todoterreno (más de 8 tecnologías o 3+ categorías)
  const techFlags = greenFlags.filter(f => 
    ['frontend', 'backend', 'database', 'devops', 'testing'].includes(f.category || '')
  );
  
  if (techFlags.length > 8 || technologyCategories.size >= 3) {
    redFlags.push({
      flagType: 'todoterreno',
      matchedText: 'Perfil todoterreno excesivo',
      category: 'excesivo'
    });
  }

  // Calcular score
  const score = calculateScore(greenFlags, redFlags);
  const color = getScoreColor(score);
  const verdict = generateVerdict(score, greenFlags, redFlags);
  
  const endTime = performance.now();
  const processingTime = endTime - startTime;

  return {
    textLength: text.length,
    score,
    color,
    verdict,
    greenFlags,
    redFlags,
    processingTime
  };
};

const findFlags = (text: string, patterns: Pattern[], results: FlagResult[]) => {
  patterns.forEach(pattern => {
    const matches = text.match(pattern.regex);
    if (matches) {
      matches.forEach(match => {
        results.push({
          flagType: pattern.name,
          matchedText: match.trim(),
          category: pattern.category
        });
      });
    }
  });
};
```

---

## Cálculo de Score

```typescript
// hooks/useScoreCalculation.ts
export const calculateScore = (
  greenFlags: GreenFlagResult[],
  redFlags: RedFlagResult[]
): number => {
  const baseScore = 50;
  const greenPoints = 10;
  const redPoints = -15;

  let score = baseScore;
  score += greenFlags.length * greenPoints;
  score += redFlags.length * redPoints;

  return Math.max(1, Math.min(100, score));
};

export const getScoreColor = (score: number): ScoreColor => {
  if (score >= 80) return 'green';
  if (score >= 50) return 'yellow';
  return 'red';
};

export const getVerdict = (score: number, greenFlags: GreenFlagResult[], redFlags: RedFlagResult[]): Verdict => {
  const highScoreFlags = greenFlags.map(f => f.matchedText);
  const lowScoreFlags = redFlags.map(f => f.matchedText);

  if (score >= 80) {
    return {
      title: 'Excelente oportunidad',
      description: 'Recomendada',
      advice: 'Esta oferta parece muy prometedora. Los puntos fuertes incluyen: ' + 
        (highScoreFlags.length > 0 ? highScoreFlags.slice(0, 3).join(', ') : 'ningún problema detectado'),
      flagsThatInfluenced: highScoreFlags.slice(0, 3)
    };
  } else if (score >= 50) {
    return {
      title: 'Oportunidad con potential',
      description: 'Requiere atención a detalles',
      advice: 'La oferta tiene aspectos positivos, pero también hay algunos puntos de atención. ' +
        'Revisa especialmente: ' + (lowScoreFlags.length > 0 ? lowScoreFlags.slice(0, 2).join(', ') : 'ningún problema grave'),
      flagsThatInfluenced: [...highScoreFlags.slice(0, 2), ...lowScoreFlags.slice(0, 2)]
    };
  } else {
    return {
      title: 'Alerta',
      description: 'Revisa las Red Flags antes de aplicar',
      advice: 'Esta oferta tiene múltiples señales de alerta. ' +
        'Pregunta especialmente por: ' + lowScoreFlags.slice(0, 3).join(', ') + 
        '. Considera si estás dispuesto/a a asumir estos riesgos.',
      flagsThatInfluenced: lowScoreFlags.slice(0, 3)
    };
  }
};
```

---

## Manejo de Errores

```typescript
// components/Common/ErrorBanner.tsx
export const ErrorBanner = ({ message }: { message: string }) => (
  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
    <div className="flex items-center gap-2 text-red-400">
      <span className="text-lg">⚠️</span>
      <p className="font-medium">{message}</p>
    </div>
  </div>
);
```

---

## Consideraciones de Performance

1. **Procesamiento local**: Todo el análisis ocurre en el navegador, sin I/O externo
2. **Regex optimizado**: Patrones precompilados para máxima velocidad
3. **Debounce para validación**: No se valida en cada keystroke, solo al hacer submit
4. **Loading indicator**: Se muestra si el procesamiento excede 200ms
5. **Web Workers**: Para ofertas muy largas (>20000 chars), considerar Web Workers

### Tiempos de Referencia

- Procesamiento normal (1000-5000 chars): <100ms
- Procesamiento largo (5000-20000 chars): 100-500ms
- Procesamiento muy largo (>20000 chars): 500-1000ms

---

## Accesibilidad (a11y)

```typescript
// Ejemplos de características de accesibilidad
- <textarea> con labels asociados
- Botones con textos descriptivos
- Colores con contraste suficiente (WCAG AA)
- Feedback visual en foco (outline)
- ARIA labels para iconos decorativos
- Navegación con teclado
- Mensajes de error visibles y legibles
```

---

## Estructura de Resultados de Ejemplo

```json
{
  "textLength": 1250,
  "score": 75,
  "color": "yellow",
  "verdict": {
    "title": "Oportunidad con potential",
    "description": "Requiere atención a detalles",
    "advice": "La oferta tiene aspectos positivos, pero también hay algunos puntos de atención. Revisa especialmente: sueldo competitivo. Considera si estás dispuesto/a a asumir estos riesgos.",
    "flagsThatInfluenced": ["100% Remote", "sueldo competitivo"]
  },
  "greenFlags": [
    {
      "flagType": "Salary range",
      "matchedText": "$40.000 - $60.000",
      "category": "transparencia_salarial"
    },
    {
      "flagType": "100% Remote",
      "matchedText": "100% remoto",
      "category": "modalidad_remota"
    },
    {
      "flagType": "stack_tecnico",
      "matchedText": "Stack técnico delimitado",
      "category": "stack"
    }
  ],
  "redFlags": [
    {
      "flagType": "Competitive Salary",
      "matchedText": "sueldo competitivo",
      "category": "ambigüedad_salarial"
    }
  ],
  "processingTime": 45.3
}
```

---

## Testing Strategy

### Property-Based Testing

Las siguientes propiedades se validarán mediante pruebas property-based:

1. **Round-trip de score**: Para cualquier oferta con Green Flags y Red Flags conocidos, el score calculado debe ser predecible
2. **Score bounds**: El score siempre debe estar entre 1 y 100 para cualquier entrada válida
3. **Flag detection**: Para ofertas que contienen patrones específicos, los flags correspondientes deben ser detectados
4. **Verdict consistency**: La relación entre score y veredicto debe ser consistente (80+ = "Excelente", etc.)
5. **Processing time**: Para ofertas menores a 10000 chars, el procesamiento debe completar en <500ms

### Example-Based Testing

- Validación de entradas vacías y extremas (menos de 100 chars, más de 50000 chars)
- Casos específicos de patrones con ejemplos reales
- Pruebas de accesibilidad (navegación por teclado, lectores de pantalla)
- Pruebas de responsive design en diferentes viewport sizes

---

## Deployment

### Opciones de hosting

- **GitHub Pages**: Ideal para repositorios públicos
- **Netlify**: Drag & drop o git-based deploy
- **Vercel**: Integración nativa con Vite
- **Cloudflare Pages**: Edge-based hosting rápido

### Configuración mínima

```bash
# Build
npm run build

# Preview
npm run preview

# Deploy (ejemplo Netlify)
netlify deploy --prod
```

---

## Notas de Diseño

1. **Local-first**: Todo el análisis ocurre en el navegador, garantizando privacidad
2. **Regex-first**: Patrones de expresión regular para detección rápida de keywords
3. **Score-based**: Sistema de puntuación simple y explicado
4. **Transparent**: El usuario ve exactamente qué flags fueron detectados y por qué
5. **Responsive**: Diseño que funciona en móviles y desktop
6. **Fast**: Procesamiento local garantiza tiempos de respuesta instantáneos

---

## Próximos Pasos (no incluidos en este diseño)

1. Implementación de componentes React con TypeScript
2. Configuración de Vite + Tailwind CSS
3. Unit tests con Vitest
4. E2E tests con Playwright o Cypress
5. Optimización de regex para patrones complejos
6. Configuración de CI/CD
7. Documentación del proyecto (README)