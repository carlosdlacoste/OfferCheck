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
} from "../greenFlags";

// SALARY_PATTERNS Tests
describe("SALARY_PATTERNS", () => {
  describe("USD Salary Range", () => {
    test("detects dollar 50000-70000 range", () => {
      const text = "Salary range: $50,000-$70,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
      expect(matched[0].name).toBe("Salary range (USD)");
    });

    test("detects dollar 80k-120k range", () => {
      const text = "Ofrecemos $80k-$120k según experiencia";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
      expect(matched[0].name).toBe("Salary range (USD)");
    });

    test("detects standalone dollar 100000", () => {
      const text = "Salario de $100,000 anuales";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });

    test("case insensitive USD range", () => {
      const text = "$50,000-$70,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });
  });

  describe("EUR Salary Range", () => {
    test("detects euro 40000-60000 range", () => {
      const text = "Salario entre €40,000-€60,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
      expect(matched[0].name).toBe("Salary range (EUR)");
    });

    test("detects euro 50k-80k range", () => {
      const text = "Rango salarial €50k-€80k";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
      expect(matched[0].name).toBe("Salary range (EUR)");
    });

    test("detects standalone euro 75000", () => {
      const text = "Salario de €75,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });
  });

  describe("Spanish de X a Y Pattern", () => {
    test("detects de 30000 a 45000", () => {
      const text = "Salario de 30,000 a 45,000 euros";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
      expect(matched[0].name).toBe("Salary range (es)");
    });

    test("detects de 25k a 35k", () => {
      const text = "Rango de 25k a 35k euros";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });

    test("detects de 40000 a 60000 with spaces", () => {
      const text = "Salario de 40 000 a 60 000 €";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });

    test("detects de 50000 a 70000 with dots", () => {
      const text = "Salario de 50.000 a 70.000 €";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });
  });

  describe("Spanish entre X e Y Pattern", () => {
    test("detects entre 40000 e 60000", () => {
      const text = "Salario entre 40,000 e 60,000 euros";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
      expect(matched[0].name).toBe("Salary range (between)");
    });

    test("detects entre 25k e 35k", () => {
      const text = "Rango entre 25k e 35k euros";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });

    test("detects entre 45000 e 55000 with spaces", () => {
      const text = "Salario entre 45 000 e 55 000 €";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });
  });

  describe("English from X to Y Pattern", () => {
    test("detects from dollar 50000 to 70000", () => {
      const text = "Salary from $50,000 to $70,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
      expect(matched[0].name).toBe("Salary range (from-to)");
    });

    test("detects from 30k to 45k", () => {
      const text = "Rango de 30k to 45k euros";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });

    test("detects from 40000 to 60000 with dots", () => {
      const text = "Salario from 40.000 to 60.000 €";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });
  });

  describe("Multiple salary patterns in same text", () => {
    test("detects multiple USD ranges", () => {
      const text = "Ofrecemos $50,000-$70,000 o $60,000-$80,000 según perfil";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(2);
    });

    test("detects mixed USD and EUR", () => {
      const text = "Salary $50,000-$70,000 or €40,000-€60,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(2);
    });

    test("detects Spanish and USD in same text", () => {
      const text = "Rango de 30,000 a 45,000 o $40,000-$60,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(2);
    });
  });

  describe("Negative matches", () => {
    test("does not match random numbers", () => {
      const text = "Tenemos 50 empleados";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });

    test("does not match USD without dollar sign", () => {
      const text = "Salary of 50000 dollars";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });

    test("does not match EUR without euro sign", () => {
      const text = "Salario de 40000 euros";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });

  describe("Edge cases", () => {
    test("handles very large numbers", () => {
      const text = "Salary $1,000,000-$2,000,000";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });

    test("handles numbers without separators", () => {
      const text = "Rango 50000 a 70000 euros";
      const matched = SALARY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(1);
    });
  });
});

// REMOTE_PATTERNS Tests
describe("REMOTE_PATTERNS", () => {
  test("detects 100 remoto", () => {
    const text = "Puesto 100% remoto";
    const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("100% Remote");
  });

  test("detects totalmente remoto", () => {
    const text = "Puesto totalmente remoto";
    const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Totally Remote");
  });

  test("detects remoto standalone", () => {
    const text = "Trabajo remoto disponible";
    const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Remote");
  });

  test("detects trabajo remoto", () => {
    const text = "Ofrecemos trabajo remoto";
    const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Remote Work");
  });

  test("case insensitive remote", () => {
    const text = "100% REMOTO";
    const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  describe("Multiple patterns in same text", () => {
    test("detects 100% remoto and totalmente remoto together", () => {
      const text = "Puesto 100% remoto y totalmente remoto";
      const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(2);
    });

    test("detects all remote patterns in one text", () => {
      const text = "100% remoto, totalmente remoto, trabajo remoto";
      const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });
  });

  describe("Negative matches", () => {
    test("does not match remota as adjective", () => {
      const text = "Zona remota para oficina";
      const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });

    test("does not match partial word", () => {
      const text = "Somos una empresa remito-servicio";
      const matched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// FLEXIBILITY_PATTERNS Tests
describe("FLEXIBILITY_PATTERNS", () => {
  test("detects flexibilidad horaria", () => {
    const text = "Ofrecemos flexibilidad horaria";
    const matched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Flexible Hours");
  });

  test("detects horario flexible", () => {
    const text = "Horario flexible y autonomía";
    const matched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Flexible Schedule");
  });

  test("detects horario adaptado", () => {
    const text = "Horario adaptado a tus necesidades";
    const matched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Adaptable Schedule");
  });

  test("detects work-life balance", () => {
    const text = "Nos preocupamos por el work-life balance";
    const matched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Work-Life Balance");
  });

  test("case insensitive flexibility", () => {
    const text = "FLEXIBILIDAD HORARIA";
    const matched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  describe("Multiple patterns in same text", () => {
    test("detects multiple flexibility patterns", () => {
      const text = "Flexibilidad horaria, horario flexible y work-life balance";
      const matched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });
  });

  describe("Negative matches", () => {
    test("does not match partial words", () => {
      const text = "Horarios flexibles no son lo mismo";
      const matched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// FRONTEND_PATTERNS Tests
describe("FRONTEND_PATTERNS", () => {
  test("detects React", () => {
    const text = "Trabajas con React";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Frontend Framework");
  });

  test("detects Vue", () => {
    const text = "Usamos Vue para la interfaz";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Angular", () => {
    const text = "Experiencia con Angular requerida";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Svelte", () => {
    const text = "Stack tecnológico Svelte";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Next", () => {
    const text = "Next.js para SSR";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Nuxt", () => {
    const text = "Nuxt.js con Vue";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Remix", () => {
    const text = "Remix para aplicaciones web";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("case insensitive frontend", () => {
    const text = "REACT Y VUE";
    const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(2);
  });

  describe("Multiple patterns in same text", () => {
    test("detects multiple frontend frameworks", () => {
      const text = "Trabajas con React, Vue o Angular";
      const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });
  });

  describe("Negative matches", () => {
    test("does not match partial words", () => {
      const text = "Reactivo es diferente";
      const matched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// BACKEND_PATTERNS Tests
describe("BACKEND_PATTERNS", () => {
  test("detects JavaScript", () => {
    const text = "JavaScript para el backend";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Backend Language");
  });

  test("detects TypeScript", () => {
    const text = "TypeScript es obligatorio";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Python", () => {
    const text = "Python para APIs";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Java", () => {
    const text = "Java Spring Boot";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects C sharp", () => {
    const text = "C# con .NET";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects PHP", () => {
    const text = "PHP para web";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Ruby", () => {
    const text = "Ruby on Rails";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Go", () => {
    const text = "Go para microservicios";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Rust", () => {
    const text = "Rust en el backend";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Node", () => {
    const text = "Node.js para APIs";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Deno", () => {
    const text = "Deno como alternativa";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("case insensitive backend", () => {
    const text = "JAVASCRIPT Y PYTHON";
    const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(2);
  });

  describe("Multiple patterns in same text", () => {
    test("detects multiple backend languages", () => {
      const text = "JavaScript, Python y Node.js";
      const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });
  });

  describe("Negative matches", () => {
    test("does not match partial words", () => {
      const text = "Tipado en JavaScript es opcional";
      const matched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// DATABASE_PATTERNS Tests
describe("DATABASE_PATTERNS", () => {
  test("detects PostgreSQL", () => {
    const text = "PostgreSQL para datos";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Database");
  });

  test("detects MySQL", () => {
    const text = "MySQL para el proyecto";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects MongoDB", () => {
    const text = "MongoDB para datos no estructurados";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Redis", () => {
    const text = "Redis para cache";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Elasticsearch", () => {
    const text = "Elasticsearch para búsqueda";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects DynamoDB", () => {
    const text = "DynamoDB en AWS";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Firebase", () => {
    const text = "Firebase como BaaS";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Supabase", () => {
    const text = "Supabase para autenticación";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("case insensitive database", () => {
    const text = "POSTGRESQL Y MYSQL";
    const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(2);
  });

  describe("Multiple patterns in same text", () => {
    test("detects multiple databases", () => {
      const text = "PostgreSQL, MongoDB y Redis";
      const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });
  });

  describe("Negative matches", () => {
    test("does not match partial words", () => {
      const text = "PostgreSQL es una base de datos";
      const matched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// DEVOPS_PATTERNS Tests
describe("DEVOPS_PATTERNS", () => {
  test("detects Docker", () => {
    const text = "Docker para contenedores";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("DevOps");
  });

  test("detects Kubernetes", () => {
    const text = "Kubernetes para orquestación";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects AWS", () => {
    const text = "AWS para infraestructura";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Azure", () => {
    const text = "Azure como alternativa";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects GCP", () => {
    const text = "GCP para cloud";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects CI-CD", () => {
    const text = "CI/CD pipelines";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Jenkins", () => {
    const text = "Jenkins para CI";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects GitHub Actions", () => {
    const text = "GitHub Actions workflows";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects GitLab CI", () => {
    const text = "GitLab CI pipelines";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("case insensitive devops", () => {
    const text = "DOCKER Y KUBERNETES";
    const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(2);
  });

  describe("Multiple patterns in same text", () => {
    test("detects multiple DevOps tools", () => {
      const text = "Docker, Kubernetes y GitHub Actions";
      const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });
  });

  describe("Negative matches", () => {
    test("does not match partial words", () => {
      const text = "Docker es un contenedor";
      const matched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// TESTING_PATTERNS Tests
describe("TESTING_PATTERNS", () => {
  test("detects Jest", () => {
    const text = "Jest para testing";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Testing Framework");
  });

  test("detects Cypress", () => {
    const text = "Cypress para E2E";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Playwright", () => {
    const text = "Playwright como alternativa";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Mocha", () => {
    const text = "Mocha con Chai";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Chai", () => {
    const text = "Chai para assertions";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects Selenium", () => {
    const text = "Selenium para automatización";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects PHPUnit", () => {
    const text = "PHPUnit para PHP";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("detects PyTest", () => {
    const text = "PyTest para Python";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  test("case insensitive testing", () => {
    const text = "JEST Y CYPRESS";
    const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(2);
  });

  describe("Multiple patterns in same text", () => {
    test("detects multiple testing frameworks", () => {
      const text = "Jest, Cypress y Playwright";
      const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });
  });

  describe("Negative matches", () => {
    test("does not match partial words", () => {
      const text = "Jest es una palabra";
      const matched = TESTING_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// DEVELOPMENT_PATTERNS Tests
describe("DEVELOPMENT_PATTERNS", () => {
  test("detects formación continua", () => {
    const text = "Ofrecemos formación continua";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Continuous Training");
  });

  test("detects formación específica", () => {
    const text = "Formación específica para el puesto";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Specific Training");
  });

  test("detects capacitación", () => {
    const text = "Capacitación constante";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Training");
  });

  test("detects desarrollo profesional", () => {
    const text = "Desarrollo profesional garantizado";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Professional Development");
  });

  test("detects growth", () => {
    const text = "Oportunidad de growth";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Growth");
  });

  test("detects aprendizaje", () => {
    const text = "Ambiente de aprendizaje";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
    expect(matched[0].name).toBe("Learning");
  });

  test("case insensitive development", () => {
    const text = "FORMACIÓN CONTINUA";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(1);
  });

  describe("Multiple patterns in same text", () => {
    test("detects multiple development patterns", () => {
      const text = "Formación continua, formación específica y desarrollo profesional";
      const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(3);
    });

    test("detects mixed Spanish and English", () => {
      const text = "Formación continua y growth opportunities";
      const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(2);
    });
  });

  describe("Negative matches", () => {
    test("does not match partial words", () => {
      const text = "Formación es importante";
      const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
      expect(matched).toHaveLength(0);
    });
  });
});

// Comprehensive integration tests
describe("Green Flags Integration Tests", () => {
  test("detects salary, remote, and flexibility together", () => {
    const text = "Ofrecemos $50,000-$70,000, 100% remoto y flexibilidad horaria";
    const salaryMatched = SALARY_PATTERNS.filter(p => p.regex.test(text));
    const remoteMatched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    const flexibilityMatched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));

    expect(salaryMatched).toHaveLength(1);
    expect(remoteMatched).toHaveLength(1);
    expect(flexibilityMatched).toHaveLength(1);
  });

  test("detects full tech stack in one text", () => {
    const text = "Trabajas con React, Node.js, PostgreSQL, Docker y Jest";
    const frontendMatched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    const backendMatched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    const databaseMatched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    const devopsMatched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    const testingMatched = TESTING_PATTERNS.filter(p => p.regex.test(text));

    expect(frontendMatched).toHaveLength(1);
    expect(backendMatched).toHaveLength(1);
    expect(databaseMatched).toHaveLength(1);
    expect(devopsMatched).toHaveLength(1);
    expect(testingMatched).toHaveLength(1);
  });

  test("detects development patterns in job description", () => {
    const text = "Ofrecemos formación continua y desarrollo profesional";
    const matched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));
    expect(matched).toHaveLength(2);
  });

  test("complex job description matches multiple categories", () => {
    const text = "Ofrecemos $60,000-$80,000, 100% remoto, horario flexible, React, Node.js, PostgreSQL, Docker y formación continua";
    
    const salaryMatched = SALARY_PATTERNS.filter(p => p.regex.test(text));
    const remoteMatched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    const flexibilityMatched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
    const frontendMatched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    const backendMatched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    const databaseMatched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    const devopsMatched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    const developmentMatched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));

    expect(salaryMatched).toHaveLength(1);
    expect(remoteMatched).toHaveLength(1);
    expect(flexibilityMatched).toHaveLength(1);
    expect(frontendMatched).toHaveLength(1);
    expect(backendMatched).toHaveLength(1);
    expect(databaseMatched).toHaveLength(1);
    expect(devopsMatched).toHaveLength(1);
    expect(developmentMatched).toHaveLength(1);
  });

  test("case insensitive comprehensive test", () => {
    const text = "OFRECEMOS $60,000-80,000, 100% REMOTO, HORARIO FLEXIBLE, REACT, NODE.JS, POSTGRESQL, DOCKER Y FORMACIÓN CONTINUA";
    
    const salaryMatched = SALARY_PATTERNS.filter(p => p.regex.test(text));
    const remoteMatched = REMOTE_PATTERNS.filter(p => p.regex.test(text));
    const flexibilityMatched = FLEXIBILITY_PATTERNS.filter(p => p.regex.test(text));
    const frontendMatched = FRONTEND_PATTERNS.filter(p => p.regex.test(text));
    const backendMatched = BACKEND_PATTERNS.filter(p => p.regex.test(text));
    const databaseMatched = DATABASE_PATTERNS.filter(p => p.regex.test(text));
    const devopsMatched = DEVOPS_PATTERNS.filter(p => p.regex.test(text));
    const developmentMatched = DEVELOPMENT_PATTERNS.filter(p => p.regex.test(text));

    expect(salaryMatched).toHaveLength(1);
    expect(remoteMatched).toHaveLength(1);
    expect(flexibilityMatched).toHaveLength(1);
    expect(frontendMatched).toHaveLength(1);
    expect(backendMatched).toHaveLength(1);
    expect(databaseMatched).toHaveLength(1);
    expect(devopsMatched).toHaveLength(1);
    expect(developmentMatched).toHaveLength(1);
  });
});
