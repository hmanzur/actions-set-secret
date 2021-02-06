module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    node: true
  },
  overrides: [
    {
      files: [
        '**/*.spec.js'
      ],
      env: {
        jest: true
      }
    }
  ],
  extends: [
    'plugin:jsdoc/recommended',
    'strongloop'
  ],
  plugins: [
    'jsdoc'
  ],
  rules: {
    'max-len': ['error', { code: 150 }],
    indent: [
      'error', 2,
      {SwitchCase: 1}
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'jsdoc/no-undefined-types': 0
  }
}
