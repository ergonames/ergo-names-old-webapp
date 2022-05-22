module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/prettier',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-default-prop': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-var': 2,
    'prefer-const': 2,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        Vue: 'never',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
