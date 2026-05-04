import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

import customRules from './eslint-custom-rules/index.js';

export default [
  {
    ignores: [
      'node_modules',
      'build',
      'eslint.config.js',
      'vite.config.ts',
      'icon-loader.js',
      'src/app/types',
      'swagger-typescript-api',
      'src/shared/api/generated-dto',
      'src/shared/api/services.ts',
    ],
  },

  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  {
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      boundaries,
      import: importPlugin,
      'custom-rules': customRules,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        alias: [
          ['@pages', './src/pages'],
          ['@widgets', './src/widgets'],
          ['@features', './src/features'],
          ['@entities', './src/entities'],
          ['@shared', './src/shared'],
        ],
      },
      'boundaries/elements': [
        { type: 'pages', pattern: 'src/pages/**/*' },
        { type: 'widgets', pattern: 'src/widgets/**/*', capture: ['slice', 'segment'] },
        { type: 'features', pattern: 'src/features/**/*', capture: ['slice', 'segment'] },
        { type: 'entities', pattern: 'src/entities/**/*', capture: ['slice', 'segment'] },
        { type: 'shared', pattern: 'src/shared/**/*' },
      ],
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/prop-types': 'off',
      'import/no-relative-packages': 'error',
      'import/no-self-import': 'error',
      'import/no-duplicates': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@pages',
              message: 'Импорт через public API (index.ts) разрешён только из верхнего уровня',
            },
            {
              name: '@widgets',
              message: 'Импорт через public API (index.ts) разрешён только из верхнего уровня',
            },
            {
              name: '@features',
              message: 'Импорт через public API (index.ts) разрешён только из верхнего уровня',
            },
            {
              name: '@entities',
              message: 'Импорт через public API (index.ts) разрешён только из верхнего уровня',
            },
          ],

          patterns: [
            '@pages/*/*/*',
            '@pages/*/*/*/**',
            '@widgets/*/*/*',
            '@widgets/*/*/*/**',
            '@features/*/*/*',
            '@features/*/*/*/**',
            '@entities/*/*/*',
            '@entities/*/*/*/**',
          ],
        },
      ],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: ['shared'], allow: [['shared']] },
            { from: ['entities'], allow: [['shared'], ['entities', { slice: `\${slice}` }]] },
            { from: ['features'], allow: [['shared'], ['entities'], ['features', { slice: `\${slice}` }]] },
            { from: ['widgets'], allow: [['shared'], ['entities'], ['features'], ['widgets', { slice: `\${slice}` }]] },
            { from: ['pages'], allow: [['shared'], ['entities'], ['features'], ['widgets']] },
          ],
        },
      ],
      'custom-rules/require-index-file': [
        'error',
        {
          folders: ['pages', 'widgets', 'features', 'entities', 'shared'],
          ignoreSubfolders: ['__tests__', 'api'],
          ignoreFilePatterns: ['.test', '.spec', 'use-styles'],
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react', '^@?\\w'],
            ['^@app(/.*|$)'],
            ['^@pages(/.*|$)'],
            ['^@widgets(/.*|$)'],
            ['^@features(/.*|$)'],
            ['^@entities(/.*|$)'],
            ['^@shared(/.*|$)'],
            ['^@test(/.*|$)'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
  {
    files: ['./src/main.tsx'],
    rules: {
      'import/no-relative-packages': 'off',
      'import/no-self-import': 'off',
      'import/no-duplicates': 'off',
    },
  },
];
