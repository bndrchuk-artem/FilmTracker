const baseConfig = require('./index.js');

module.exports = {
  ...baseConfig,
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    ...baseConfig.rules,
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
