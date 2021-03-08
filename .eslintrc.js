module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: '17',
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'no-use-before-define': 0,
    'prefer-template': 'error',
    'space-before-function-paren': 0,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-fragments': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-expression',
      },
    ],
    'react/no-unused-prop-types': 0,
    'import/export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
