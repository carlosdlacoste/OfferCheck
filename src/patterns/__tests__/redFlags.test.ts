import { OVERWORK_PATTERNS, SALARY_AMBIGUITY_PATTERNS, EXCESSIVE_HIRING_PATTERNS } from '../redFlags';

// Overwork/Pressure Patterns Tests
describe('OVERWORK_PATTERNS', () => {
  test('detects "trabajo bajo presión"', () => {
    const text = 'Buscamos a alguien para trabajo bajo presión';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Work Under Pressure');
  });

  test('detects "ponerse la camiseta"', () => {
    const text = 'Se requiere ponerse la camiseta cuando sea necesario';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Put on the Jersey');
  });

  test('detects "disponibilidad 24/7"', () => {
    const text = 'Se requiere disponibilidad 24/7 para el puesto';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('24/7 Availability');
  });

  test('detects "disponibilidad continua"', () => {
    const text = 'Ofrecemos disponibilidad continua para el equipo';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Continuous Availability');
  });

  test('detects "fin de semana"', () => {
    const text = 'Se necesitan trabajadores disponibles los fines de semana';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Weekend Work');
  });

  test('detects "guardias"', () => {
    const text = 'El puesto incluye realizar guardias fuera de horario laboral';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('On-Call');
  });

  test('detects "plantilla reducida"', () => {
    const text = 'Trabajas en una plantilla reducida';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Small Team');
  });

  test('detects multiple overwork indicators in same text', () => {
    const text = 'Buscamos a alguien para trabajo bajo presión con disponibilidad 24/7 y plantilla reducida';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(3);
  });

  test('case insensitive matching', () => {
    const text = 'TRABAJO BAJO PRESIÓN';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test('word boundary matching', () => {
    const text = 'presión no es lo mismo que trabajo bajo presión';
    const matched = OVERWORK_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });
});

// Salary Ambiguity Patterns Tests
describe('SALARY_AMBIGUITY_PATTERNS', () => {
  test('detects "sueldo competitivo"', () => {
    const text = 'Ofrecemos un sueldo competitivo';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Competitive Salary');
  });

  test('detects "sueldo a convenir"', () => {
    const text = 'El sueldo a convenir será según experiencia';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Salary to Convene');
  });

  test('detects "no especificado"', () => {
    const text = 'El salario no especificado en la oferta';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Not Specified');
  });

  test('detects "a valorar"', () => {
    const text = 'Remuneración a valorar según perfil';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('To Be Valued');
  });

  test('detects "a conveniar"', () => {
    const text = 'Sueldo a conveniar con la empresa';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('To Be Convened');
  });

  test('detects "no revelado"', () => {
    const text = 'El salario no revelado en el anuncio';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Not Revealed');
  });

  test('detects multiple salary ambiguity indicators in same text', () => {
    const text = 'Sueldo competitivo y a convenir, no especificado en la oferta';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(2);
  });

  test('case insensitive matching', () => {
    const text = 'SUELDO COMPETITIVO';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test('word boundary matching', () => {
    const text = 'El sueldo no es competitivo';
    const matched = SALARY_AMBIGUITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(0);
  });
});

// Excessive Hiring Process Patterns Tests
describe('EXCESSIVE_HIRING_PATTERNS', () => {
  test('detects "más de 3 fases"', () => {
    const text = 'El proceso tiene más de 3 fases';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('More than 3 Phases');
  });

  test('detects "más de 4 fases"', () => {
    const text = 'Proceso selectivo con más de 4 fases';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('More than 4 Phases');
  });

  test('detects "múltiples pruebas técnicas"', () => {
    const text = 'Tendrás que superar múltiples pruebas técnicas';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Multiple Technical Tests');
  });

  test('detects "varias entrevistas técnicas"', () => {
    const text = 'Más de varias entrevistas técnicas con el equipo';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Multiple Technical Interviews');
  });

  test('detects "proceso selectivo extenso"', () => {
    const text = 'Nuestro proceso selectivo extenso puede durar semanas';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe('Extensive Hiring Process');
  });

  test('detects multiple hiring process indicators in same text', () => {
    const text = 'Más de 3 fases y múltiples pruebas técnicas, proceso selectivo extenso';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(3);
  });

  test('case insensitive matching', () => {
    const text = 'MÁS DE 3 FASES';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test('word boundary matching', () => {
    const text = 'Tres fases es suficiente';
    const matched = EXCESSIVE_HIRING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(0);
  });
});
