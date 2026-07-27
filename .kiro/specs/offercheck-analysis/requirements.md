# Requirements Document

## Introduction

OfferCheck es una herramienta web interactiva que analiza descripciones de ofertas de trabajo en IT de forma equilibrada, evaluando aspectos positivos (Green Flags) y alertas/riesgos (Red Flags). La herramienta se ejecuta completamente en el cliente sin necesidad de backend ni autenticación.

## Glossary

- **OfferCheck**: Sistema web que analiza ofertas de trabajo en IT
- **Analyzer**: Motor de análisis local que procesa textos de ofertas
- **Green Flag**: Aspecto positivo en la oferta que indica buenas prácticas
- **Red Flag**: Aspecto negativo o alerta en la oferta que indica posibles problemas
- **Candidate**: Usuario/postulante que consulta las ofertas
- **Score**: Valor numérico que representa la calidad general de la oferta (1-100)

## Requirements

### Requirement 1: Área de Entrada de Texto

**User Story:** As a Candidate, I want to paste a job description, so that the system can analyze it for me.

#### Acceptance Criteria

1. WHEN the page loads, THE OfferCheck SHALL display a textarea element for job description input
2. WHILE the Candidate is typing in the textarea, THE OfferCheck SHALL accept text input of any length
3. WHEN the Candidate clicks the "Analizar Oferta" button, THE OfferCheck SHALL validate the input

### Requirement 2: Validación de Entrada

**User Story:** As a Candidate, I want to ensure my input is valid, so that I receive accurate analysis.

#### Acceptance Criteria

1. IF the textarea is empty when the Candidate clicks "Analizar Oferta", THEN THE Analyzer SHALL display an error message "La descripción no puede estar vacía"
2. IF the textarea contains fewer than 100 characters when the Candidate clicks "Analizar Oferta", THEN THE Analyzer SHALL display an error message "La descripción es demasiado corta para un análisis significativo"
3. IF the textarea contains more than 50000 characters when the Candidate clicks "Analizar Oferta", THEN THE Analyzer SHALL display an error message "La descripción es demasiado larga"

### Requirement 3: Detección de Green Flags - Transparencia Salarial

**User Story:** As a Candidate, I want to identify salary transparency in job offers, so that I can evaluate compensation fairness.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect salary ranges in formats including "$X-$Y", "€X-€Y", "de X a Y", "entre X e Y", and "from X to Y"
2. IF the job description contains explicit salary ranges, THEN THE Analyzer SHALL count each range as one Green Flag
3. THE Analyzer SHALL extract and record the exact text match for each salary range found

### Requirement 4: Detección de Green Flags - Modalidad Remota y Flexibilidad

**User Story:** As a Candidate, I want to identify remote work and flexibility options, so that I can evaluate work-life balance.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect phrases indicating remote work including "100% remoto", "totalmente remoto", "remoto", and "trabajo remoto"
2. WHEN THE Analyzer processes a job description, IT SHALL detect phrases indicating flexibility including "flexibilidad horaria", "horario flexible", "horario adaptado", and "work-life balance"
3. IF the job description contains remote or flexibility indicators, THEN THE Analyzer SHALL count each type as one Green Flag
4. THE Analyzer SHALL extract and record the exact text match for each indicator found

### Requirement 5: Detección de Green Flags - Stack Técnico Moderno

**User Story:** As a Candidate, I want to identify the technical stack mentioned in job offers, so that I can evaluate alignment with my skills.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect mentions of specific technologies relevant to IT roles
2. THE Analyzer SHALL identify common technology categories including frontend frameworks, backend languages, databases, DevOps tools, and methodologies
3. IF the job description mentions 3 or more specific technologies, THEN THE Analyzer SHALL count it as one Green Flag for "stack técnico delimitado"

### Requirement 6: Detección de Green Flags - Desarrollo y Formación

**User Story:** As a Candidate, I want to identify opportunities for professional development, so that I can evaluate growth potential.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect phrases indicating development opportunities including "formación continua", "formación específica", "capacitación", "desarrollo profesional", "growth", and "aprendizaje"
2. IF the job description contains development-related phrases, THEN THE Analyzer SHALL count each phrase type as one Green Flag
3. THE Analyzer SHALL extract and record the exact text match for each development phrase found

### Requirement 7: Detección de Red Flags - Sobretiempo y Presión

**User Story:** As a Candidate, I want to identify signs of overwork and pressure, so that I can evaluate workload sustainability.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect phrases indicating overwork including "trabajo bajo presión", "ponerse la camiseta", "disponibilidad 24/7", "disponibilidad continua", "fin de semana", "guardias", and "plantilla reducida"
2. IF the job description contains overwork indicators, THEN THE Analyzer SHALL count each indicator as one Red Flag
3. THE Analyzer SHALL extract and record the exact text match for each overwork indicator found

### Requirement 8: Detección de Red Flags - Ambigüedad Salarial

**User Story:** As a Candidate, I want to identify salary ambiguity, so that I can evaluate compensation transparency.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect salary ambiguity indicators including "sueldo competitivo", "sueldo a convenir", "no especificado", "a valorar", "a conveniar", and "no revelado"
2. IF the job description contains salary ambiguity indicators, THEN THE Analyzer SHALL count each indicator as one Red Flag
3. THE Analyzer SHALL extract and record the exact text match for each salary ambiguity indicator found

### Requirement 9: Detección de Red Flags - Perfil Todoterreno Excesivo

**User Story:** As a Candidate, I want to identify unrealistic job requirements, so that I can evaluate if the role is realistic.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect excessive technical requirements when the description lists more than 8 specific technologies
2. WHEN THE Analyzer processes a job description, IT SHALL detect combined frontend/backend/devops/qa requirements when the description mentions technologies from at least 3 of these categories
3. IF the job description indicates an unrealistic "todoterreno" profile, THEN THE Analyzer SHALL count it as one Red Flag

### Requirement 10: Detección de Red Flags - Proceso de Selección Excesivo

**User Story:** As a Candidate, I want to identify overly lengthy hiring processes, so that I can evaluate time investment.

#### Acceptance Criteria

1. WHEN THE Analyzer processes a job description, IT SHALL detect mentions of hiring process length including "más de 3 fases", "más de 4 fases", "múltiples pruebas técnicas", "varias entrevistas técnicas", and "proceso selectivo extenso"
2. IF the job description indicates an excessive hiring process, THEN THE Analyzer SHALL count it as one Red Flag
3. THE Analyzer SHALL extract and record the exact text match for each process indicator found

### Requirement 11: Cálculo de Score de Calidad

**User Story:** As a Candidate, I want a quality score for each job offer, so that I can quickly compare opportunities.

#### Acceptance Criteria

1. WHEN THE Analyzer completes processing, IT SHALL calculate a Quality Score between 1 and 100
2. THE Analyzer SHALL start with a base score of 50
3. FOR each Green Flag detected, THE Analyzer SHALL add 10 points to the score
4. FOR each Red Flag detected, THE Analyzer SHALL subtract 15 points from the score
5. IF the score calculation results in a value below 1, THEN THE Score SHALL be 1
6. IF the score calculation results in a value above 100, THEN THE Score SHALL be 100

### Requirement 12: Código de Color por Rango

**User Story:** As a Candidate, I want visual color coding for the quality score, so that I can quickly assess offer quality.

#### Acceptance Criteria

1. WHEN THE Score is between 80 and 100, THEN THE OfferCheck SHALL display the score in green
2. WHEN THE Score is between 50 and 79, THEN THE OfferCheck SHALL display the score in yellow
3. WHEN THE Score is between 1 and 49, THEN THE OfferCheck SHALL display the score in red

### Requirement 13: Visualización de Green Flags

**User Story:** As a Candidate, I want to see identified positive aspects, so that I understand why the offer is rated well.

#### Acceptance Criteria

1. WHEN THE Analyzer completes processing, THE OfferCheck SHALL display a section titled "🟢 Green Flags Encontradas"
2. THE OfferCheck SHALL display the count of Green Flags detected
3. THE OfferCheck SHALL list each Green Flag detected with the matched text from the job description

### Requirement 14: Visualización de Red Flags

**User Story:** As a Candidate, I want to see identified risks, so that I understand the concerns with the offer.

#### Acceptance Criteria

1. WHEN THE Analyzer completes processing, THE OfferCheck SHALL display a section titled "🔴 Red Flags Detectadas"
2. THE OfferCheck SHALL display the count of Red Flags detected
3. THE OfferCheck SHALL list each Red Flag detected with the matched text from the job description

### Requirement 15: Veredicto Rápido

**User Story:** As a Candidate, I want a concise recommendation, so that I can quickly decide whether to pursue the opportunity.

#### Acceptance Criteria

1. WHEN THE Analyzer completes processing, THE OfferCheck SHALL generate a Veredicto Rápido based on the score and flags
2. WHEN THE Score is 80 or above, THE OfferCheck SHALL recommend "Excelente oportunidad - Recomendada"
3. WHEN THE Score is between 50 and 79, THE OfferCheck SHALL recommend "Oportunidad con potential - Requiere atención a detalles"
4. WHEN THE Score is below 50, THE OfferCheck SHALL recommend "Alerta - Revisa las Red Flags antes de aplicar"
5. THE Veredicto Rápido SHALL include actionable advice based on the most significant flags detected

### Requirement 16: Interfaz Moderna y Tema Oscuro

**User Story:** As a Candidate, I want a professional interface, so that I can use the tool comfortably.

#### Acceptance Criteria

1. WHEN THE OfferCheck loads, IT SHALL use a dark color theme by default
2. WHEN THE Candidate views the interface, IT SHALL display a modern, clean design appropriate for developers
3. WHEN THE Candidate views the interface on different screen sizes, IT SHALL adapt responsively

### Requirement 17: Rendimiento de Análisis

**User Story:** As a Candidate, I want fast analysis, so that I can process multiple offers efficiently.

#### Acceptance Criteria

1. WHEN THE Candidate clicks "Analizar Oferta", THE Analyzer SHALL complete processing within 1000 milliseconds
2. WHILE processing, THE OfferCheck SHALL display a loading indicator if processing exceeds 200 milliseconds

### Requirement 18: Análisis 100% Local

**User Story:** As a Candidate, I want my data processed locally, so that my information remains private.

#### Acceptance Criteria

1. THE OfferCheck SHALL perform all analysis on the client side without making external API calls
2. THE OfferCheck SHALL NOT send job descriptions or any analysis data to external servers
3. ALL pattern matching and scoring calculations SHALL occur in the browser environment