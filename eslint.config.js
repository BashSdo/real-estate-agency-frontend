import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tseslint from 'typescript-eslint';
import vuetify from 'eslint-config-vuetify';
import { includeIgnoreFile } from '@eslint/compat';

import autoImport from './.eslintrc-auto-import.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  {
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
      ...autoImport,
    },
  },
  includeIgnoreFile(gitignorePath),
  ...vuetify,
];
