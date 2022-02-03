module.exports = {
  root: true,
  extends: ['react-app', 'eslint:recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prefer-const': 'warn',
    'no-console': 'warn',
    '@typescript-eslint/no-extra-semi': 'off',
    'semi-style': ['error', 'first'],
    'no-debugger': 'warn',
    'no-constant-condition': ['error', { checkLoops: false }],
    'require-await': 'off',
    '@typescript-eslint/require-await': 'warn',
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': ['warn'],
  },
}
