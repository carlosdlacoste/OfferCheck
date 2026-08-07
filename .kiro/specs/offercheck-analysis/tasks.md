# OfferCheck - Implementation Tasks

## Overview

- **Total tasks**: 30
- **Required tasks**: 24
- **Optional tasks**: 6
- **Estimated time**: 2-3 semanas para implementación completa
- **Language**: TypeScript (based on design document)

## Tasks

### 1. Project Setup and Configuration

- [x] 1.1 Initialize Vite + React + TypeScript project
  - Create project with `npm create vite@latest`
  - Select React and TypeScript templates
  - Install dependencies
  - _Requirements: 18.1, 18.2, 18.3_

- [x] 1.2 Configure Tailwind CSS
  - Install Tailwind CSS and dependencies
  - Configure `tailwind.config.js` with dark theme by default
  - Import Tailwind in `src/index.css`
  - _Requirements: 16.1, 16.2, 16.3_

- [x] 1.3 Set up folder structure and TypeScript config
  - Create directories: `components/`, `hooks/`, `patterns/`, `types/`
  - Configure `tsconfig.json` with proper paths
  - Set up ESLint and Prettier configuration
  - _Requirements: 18.1, 18.3_

### 2. Define Core Types and Interfaces

- [x] 2.1 Create analysis result types
  - Define `AnalysisResult`, `FlagResult`, `GreenFlagResult`, `RedFlagResult`
  - Define `ScoreColor` and `Verdict` types
  - Export to `types/analysis.ts`
  - _Requirements: 11.1, 12.1, 13.1, 14.1, 15.1_

- [x] 2.2 Create pattern types and interfaces
  - Define `Pattern` interface with regex, name, category
  - Define arrays for Green Flags and Red Flags patterns
  - Export to `patterns/types.ts`
  - _Requirements: 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1_

### 3. Implement Pattern Matching Logic

- [x] 3.1 Implement salary transparency patterns (Green Flags)
  - Create regex patterns for `$X-$Y`, `€X-€Y`, "de X a Y", "entre X e Y"
  - Handle international salary formats
  - Export to `patterns/greenFlags.ts`
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 3.2 Implement remote work patterns (Green Flags)
  - Create regex for "100% remoto", "totalmente remoto", "remoto", "trabajo remoto"
  - Export to `patterns/greenFlags.ts`
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 3.3 Implement flexibility patterns (Green Flags)
  - Create regex for "flexibilidad horaria", "horario flexible", "horario adaptado", "work-life balance"
  - Export to `patterns/greenFlags.ts`
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 3.4 Implement technology stack patterns (Green Flags)
  - Create regex patterns for frontend, backend, database, DevOps, testing
  - Track categories for stack count logic
  - Export to `patterns/greenFlags.ts`
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 3.5 Implement development opportunity patterns (Green Flags)
  - Create regex for "formación continua", "formación específica", "capacitación", etc.
  - Export to `patterns/greenFlags.ts`
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 3.6 Implement overwork/red flag patterns
  - Create regex for "trabajo bajo presión", "ponerse la camiseta", "disponibilidad 24/7", etc.
  - Export to `patterns/redFlags.ts`
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 3.7 Implement salary ambiguity patterns
  - Create regex for "sueldo competitivo", "sueldo a convenir", "no especificado", etc.
  - Export to `patterns/redFlags.ts`
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 3.8 Implement excessive hiring process patterns
  - Create regex for "más de 3 fases", "más de 4 fases", "múltiples pruebas técnicas", etc.
  - Export to `patterns/redFlags.ts`
  - _Requirements: 10.1, 10.2, 10.3_

### 4. Implement Core Analysis Engine

- [ ] 4.1 Implement pattern matching function
  - Create `findFlags()` helper to search text for patterns
  - Return matched flags with type, text, and category
  - _Requirements: 3.3, 4.3, 5.3, 6.3, 7.2, 8.2, 9.2, 10.2_

- [ ] 4.2 Implement main analysis function
  - Validate input length (0, <100, >50000)
  - Run all pattern matching
  - Count stack technologies and detect todoterreno profiles
  - _Requirements: 2.1, 2.2, 2.3, 9.1, 9.2_

- [ ] 4.3 Implement score calculation
  - Start with base score of 50
  - Add 10 points per Green Flag
  - Subtract 15 points per Red Flag
  - Clamp between 1 and 100
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [ ] 4.4 Implement color coding
  - Green for scores 80-100
  - Yellow for scores 50-79
  - Red for scores 1-49
  - _Requirements: 12.1, 12.2, 12.3_

- [ ] 4.5 Implement verdict generation
  - Generate verdict based on score thresholds
  - Include advice based on flags detected
  - Track which flags influenced verdict
  - _Requirements: 15.1, 15.2, 15.3, 15.4_

### 5. Implement React Components

- [ ] 5.1 Create Header component
  - Display title "OfferCheck"
  - Include description about analyzing IT job offers
  - Use dark theme styling
  - _Requirements: 16.1, 16.2_

- [ ] 5.2 Create Footer component
  - Show project information and credits
  - Include links if needed
  - Consistent with dark theme
  - _Requirements: 16.1, 16.2_

- [ ] 5.3 Create TextAreaInput component
  - Large textarea for job description input
  - Placeholder text in Spanish
  - Support for long text input
  - _Requirements: 1.1, 1.2, 18.1_

- [ ] 5.4 Create AnalyzeButton component
  - Central button "Analizar Oferta"
  - Loading state with disabled behavior
  - Responsive sizing
  - _Requirements: 1.3, 17.1, 17.2_

- [ ] 5.5 Create ScoreDisplay component
  - Display score from 1-100
  - Color-coded background (green/yellow/red)
  - Large, readable text
  - _Requirements: 11.1, 12.1, 13.1, 14.1_

- [ ] 5.6 Create GreenFlagsList component
  - Display count of Green Flags
  - List each flag with matched text
  - Green accent styling
  - _Requirements: 13.1, 13.2, 13.3_

- [ ] 5.7 Create RedFlagsList component
  - Display count of Red Flags
  - List each flag with matched text
  - Red accent styling
  - _Requirements: 14.1, 14.2, 14.3_

- [ ] 5.8 Create Verdict component
  - Display verdict title and description
  - Include actionable advice
  - Highlight influential flags
  - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [ ] 5.9 Create LoadingIndicator component
  - Show spinner when processing
  - Display after 200ms delay
  - Fade out when complete
  - _Requirements: 17.2_

- [ ] 5.10 Create ErrorBanner component
  - Display error messages in red banner
  - Icon and message styling
  - Auto-dismiss or manual close
  - _Requirements: 2.1, 2.2, 2.3_

### 6. Integrate Components

- [ ] 6.1 Create App.tsx main component
  - Layout structure with Header, Input, Result, Footer
  - State management for analysis results
  - Error handling
  - _Requirements: 16.1, 16.2, 16.3_

- [ ] 6.2 Implement analysis hook
  - Extract analysis logic to `useAnalyzer` hook
  - Handle input validation
  - Call analysis engine
  - Return results and errors
  - _Requirements: 2.1, 2.2, 2.3, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [ ] 6.3 Implement score calculation hook
  - Extract score logic to `useScoreCalculation` hook
  - Reusable across components
  - Type-safe functions
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 12.1, 12.2, 12.3_

- [ ] 6.4 Wire all components together
  - Connect input button to analysis
  - Display results when available
  - Show errors for invalid input
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3_

### 7. Testing

- [ ] 7.1 Write unit tests for pattern matching
  - Test salary patterns with examples
  - Test remote work patterns
  - Test flexibility patterns
  - Test technology stack patterns
  - _Requirements: 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1_

- [ ]* 7.2 Write property test for score calculation
  - **Property 1: Score bounds**
  - **Validates: Requirements 11.1, 11.5, 11.6**
  - Score always between 1-100 for valid inputs

- [ ]* 7.3 Write property test for flag detection
  - **Property 2: Pattern matching accuracy**
  - **Validates: Requirements 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1**
  - All defined patterns detect correctly

- [ ] 7.4 Write example-based tests
  - Test empty input error
  - Test short input error
  - Test long input error
  - Test specific flag detection examples
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 7.5 Write accessibility tests
  - Verify keyboard navigation
  - Check ARIA labels
  - Test color contrast ratios
  - _Requirements: 16.2_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All implementation uses TypeScript as specified in the design document
- Dark theme is the default as per requirements

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3", "3.4"] },
    { "id": 3, "tasks": ["3.5", "3.6", "3.7", "3.8"] },
    { "id": 4, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5"] },
    { "id": 5, "tasks": ["5.1", "5.2", "5.3", "5.4"] },
    { "id": 6, "tasks": ["5.5", "5.6", "5.7", "5.8"] },
    { "id": 7, "tasks": ["5.9", "5.10"] },
    { "id": 8, "tasks": ["6.1", "6.2", "6.3", "6.4"] },
    { "id": 9, "tasks": ["7.1", "7.2", "7.3", "7.4", "7.5"] }
  ]
}
```