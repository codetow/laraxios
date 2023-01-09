module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'jest',
    '@typescript-eslint'
  ],
  env: {
    browser: true,
    'jest/globals': true
  }
}
