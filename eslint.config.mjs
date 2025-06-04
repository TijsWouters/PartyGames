// eslint.config.mjs  – ESLint 9 flat config for a React (JS) project

import js from '@eslint/js';                       // core “eslint:recommended” rules
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier/flat'; // Prettier helper :contentReference[oaicite:0]{index=0}

export default [
  /* 1️⃣  core JS rules */
  js.configs.recommended,

  /* 2️⃣  React-specific linting */
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules/**', 'dist/**', 'build/**', '**/coverage/**'],

    /* plugin objects – NOT arrays */
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },

    /* modern JS + JSX parsing */
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },

    /* React version autodetect */
    settings: { react: { version: 'detect' } },

    /* rules – start with each plugin’s recommended set, then tweak */
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      /* project-specific tweaks */
      'react/react-in-jsx-scope': 'off',          // React ≥17
      'react/prop-types': 'off',          // enable if you use PropTypes
      'import/order': ['warn', { 'newlines-between': 'always' }],
    },
  },

  /* 3️⃣  Prettier – keep it LAST so it can disable conflicting rules */
  eslintConfigPrettier,
];
