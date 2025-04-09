module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true, // Para incluir la cobertura de pruebas
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'html'], // Formatos de reporte
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'docs', outputName: 'test-results.xml' }]
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};
