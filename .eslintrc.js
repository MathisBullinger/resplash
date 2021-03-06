module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
    'react-app',
    'plugin:react/recommended',
  ],
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
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/prop-types': 'off',
  },
}
