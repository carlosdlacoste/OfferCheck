import { describe, it, expect, beforeEach } from 'vitest';
import analyzeJobDescription from '../useAnalyzer';

describe('analyzeJobDescription', () => {
  describe('Input Validation', () => {
    it('should throw error for empty input', () => {
      expect(() => analyzeJobDescription('')).toThrow('La descripción no puede estar vacía');
    });

    it('should throw error for whitespace-only input', () => {
      expect(() => analyzeJobDescription('   ')).toThrow('La descripción no puede estar vacía');
    });

    it('should throw error for input less than 100 characters', () => {
      const shortText = 'This is a very short job description that is definitely less than one hundred characters';
      expect(() => analyzeJobDescription(shortText)).toThrow('La descripción es demasiado corta para un análisis significativo');
    });

    it('should throw error for input more than 50000 characters', () => {
      const longText = 'x'.repeat(50001);
      expect(() => analyzeJobDescription(longText)).toThrow('La descripción es demasiado larga');
    });
  });

  describe('Pattern Matching', () => {
    const validDescription = `
      Oferta de empleo para Desarrollador Frontend en empresa tecnológica.
      
      Salario: entre 40.000€ y 60.000€ anuales.
      Modalidad: 100% remoto con horario flexible.
      
      Requisitos:
      - Experiencia con React y TypeScript
      - Conocimientos de JavaScript, HTML, CSS
      - Experiencia con PostgreSQL
      - Conocimientos de Docker y AWS
      
      Beneficios:
      - Formación continua
      - Work-life balance
      - Horario adaptable
      - Desarrollo profesional
      
      Proceso selectivo: 3 fases (entrevista técnica, prueba práctica,HR)
    `;

    it(`should detect green flags`, () => {
      const result = analyzeJobDescription(validDescription);
      
      expect(result.greenFlags.length).toBeGreaterThan(0);
      expect(result.greenFlags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ flagType: expect.stringContaining(`Salary`) }),
          expect.objectContaining({ flagType: expect.stringContaining(`Remote`) }),
          expect.objectContaining({ flagType: expect.stringContaining(`Flexible`) }),
          expect.objectContaining({ flagType: expect.stringContaining(`Training`) })
        ])
      );
    });

    it(`should detect red flags`, () => {
      const result = analyzeJobDescription(validDescription);
      
      // The description mentions "3 fases" which should match EXCESSIVE_HIRING_PATTERNS
      expect(result.redFlags.length).toBeGreaterThan(0);
    });

    it(`should track technology stack`, () => {
      const result = analyzeJobDescription(validDescription);
      
      // Should detect frontend (React), backend (TypeScript, JavaScript), 
      // database (PostgreSQL), and devops (Docker, AWS)
      expect(result.greenFlags.some(f => f.category === `frontend`)).toBe(true);
      expect(result.greenFlags.some(f => f.category === `backend`)).toBe(true);
      expect(result.greenFlags.some(f => f.category === `database`)).toBe(true);
      expect(result.greenFlags.some(f => f.category === `devops`)).toBe(true);
    });

    it(`should detect todoterreno profile`, () => {
      // Description with many different technologies (todoterreno)
      const todoterrenoDescription = `
        Necesitamos un dev que sepa de todo: React, Vue, Angular, Svelte, Node, 
        Python, Java, C#, PHP, PostgreSQL, MySQL, MongoDB, Redis, Docker, 
        Kubernetes, AWS, Azure, GCP, Jenkins, GitHub Actions, GitLab CI, 
        Jest, Cypress, Playwright, Selenium.
        
        Salario competitivo. 100% remoto.
      `;
      
      const result = analyzeJobDescription(todoterrenoDescription);
      
      // Should have >8 technologies or 3+ categories
      const techCount = new Set(
        result.greenFlags
          .filter(f => [`frontend`, `backend`, `database`, `devops`, `testing`].includes(f.category))
          .map(f => f.matchedText)
      ).size;
      
      expect(techCount).toBeGreaterThan(8);
    });

    it(`should detect stack t�cnico delimitado`, () => {
      // Description with 3-8 technologies (delimited stack)
      const delimitedStackDescription = `
        Buscamos un desarrollador con experiencia en React, TypeScript y Node.js.
        Experiencia con PostgreSQL y Docker.
        
        100% remoto con horario flexible.
        Salario: de 45.000� a 55.000�.
      `;
      
      const result = analyzeJobDescription(delimitedStackDescription);
      
      // Should have stack technologies
      expect(result.greenFlags.length).toBeGreaterThan(0);
    });

    it(`should calculate processing time`, () => {
      const result = analyzeJobDescription(validDescription);
      
      expect(result.processingTime).toBeGreaterThan(0);
      expect(result.processingTime).toBeLessThan(1000); // Should be under 1 second
    });
  });

  describe(`Edge Cases`, () => {
    it(`should handle special characters`, () => {
      const specialCharsDescription = `
        Oferta para desarrollador Frontend.
        Salario: $100.000 - $120.000.
        100% remoto. Horario flexible.
        Requisitos: React, Vue, Angular, Node.js, Python.
        Trabajo bajo presi�n.
      `;
      
      const result = analyzeJobDescription(specialCharsDescription);
      
      expect(result.greenFlags.length).toBeGreaterThan(0);
      expect(result.redFlags.length).toBeGreaterThan(0);
    });

    it(`should handle empty text with spaces`, () => {
      expect(() => analyzeJobDescription(`  \n\n  `)).toThrow(`La descripci�n no puede estar vac�a`);
    });

    it(`should handle text at boundary lengths`, () => {
      const exact100Chars = `x`.repeat(100);
      expect(() => analyzeJobDescription(exact100Chars)).not.toThrow();
      
      const exact50000Chars = `x`.repeat(50000);
      expect(() => analyzeJobDescription(exact50000Chars)).not.toThrow();
    });
  });
});
