/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'standard-with-typescript',
    'plugin:prettier/recommended', // disables conflicting ESLint rules + runs Prettier as a rule
  ],
  env: {
    es2023: true,
    node: true,
    browser: true,
  },
  ignorePatterns: ['node_modules/', '.next/', 'dist/', 'build/', 'coverage/'],
}
