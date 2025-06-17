module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
  ],
  rules: {
    'max-len': [
      'error',
      {
        ignoreTrailingComments: true,
        ignoreUrls: true,
        comments: 150,
        tabWidth: 4,
        code: 110,
      },
    ],
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'no-continue': 'off',
    'import/no-unresolved': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-undef': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': ['error', 'windows'],
    'i18next/no-literal-string': 0,
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-param-reassign': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 0,
    'react/display-name': ['error'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-redux',
            importNames: ['useDispatch'],
            message: 'useDispatch is restricted. Use custom typed useAppDispatch instead.',
          },
        ],
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.name='useDispatch']",
        message: 'useDispatch is restricted. Use custom typed useAppDispatch.',
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
    __NODEJS__: true,
    __PROFILE_MF_URL__: true,
  },
};
