/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/test/**/*.(test).{js,jsx,ts,tsx}',
    '<rootDir>/test/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ]
}
